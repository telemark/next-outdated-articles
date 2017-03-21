'use strict'

import React from 'react'
import Container from 'muicss/lib/react/container'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import Select from 'muicss/lib/react/select'
import Option from 'muicss/lib/react/option'
import Head from '../components/head'
import Articles from '../components/articles'
import Loading from '../components/loading'
const getSitemap = require('../lib/get-sitemap')
const filterSitemap = require('../lib/filter-sitemap')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(this.props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static async getInitialProps (ctx) {
    return {
      pages: [],
      data: [],
      showOnly: '',
      limitDays: 360,
      filterBy: 'Aktuelt',
      loading: false
    }
  }

  async componentDidMount () {
    this.setState({loading: true})
    const data = await getSitemap()
    const pages = filterSitemap({data: data, limitDays: this.state.limitDays})
    this.setState({data: data, pages: pages, loading: false})
  }

  handleChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const pages = filterSitemap({data: this.state.data, limitDays: this.state.limitDays})
    this.setState({pages: pages})
    console.log(pages)
  }

  render () {
    return (
      <div>
        <Head />
        <Container fluid>
          <h1 className='mui--text-title'>Utdaterte artikler</h1>
          <Form onSubmit={this.handleSubmit}>
            <legend>Filter</legend>
            <Select name='showOny' defaultValue={this.state.showOnly} onChange={this.handleChange}>
              <Option value='' label='Alle' />
              <Option value='Aktuelt' label='Aktuelt' />
            </Select>
            <Input name='limitDays' label='Vis eldre enn' floatingLabel defaultValue={this.state.limitDays} onChange={this.handleChange} />
            <Input name='filterBy' label='Dropp følgende mapper' floatingLabel defaultValue={this.state.filterBy} onChange={this.handleChange} />
            <Button variant='raised'>Oppdater filter</Button>
          </Form>
          <Loading loading={this.state.loading} />
          <Articles pages={this.state.pages} />
        </Container>
      </div>
    )
  }
}
