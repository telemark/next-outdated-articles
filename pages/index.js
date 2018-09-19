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
    this.setState({ loading: true })
    const data = await getSitemap()
    const options = {
      data: data,
      limitDays: this.state.limitDays,
      showOnly: this.state.showOnly,
      filterBy: this.state.filterBy
    }
    const pages = filterSitemap(options)
    this.setState({ data: data, pages: pages, loading: false })
  }

  hideIfLoading () {
    return this.state.loading ? 'hideMe' : 'showMe'
  }

  handleChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    console.log(target.name)
    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const options = {
      data: this.state.data,
      limitDays: this.state.limitDays,
      showOnly: this.state.showOnly,
      filterBy: this.state.filterBy
    }
    const pages = filterSitemap(options)
    this.setState({ pages: pages })
  }

  render () {
    return (
      <div>
        <Head />
        <Container fluid>
          <Form onSubmit={this.handleSubmit}>
            <legend>Filterinnstillinger</legend>
            <Select name='showOnly' defaultValue={this.state.showOnly} onChange={this.handleChange}>
              <Option value='' label='Alle' />
              <Option value='Politikk' label='Politikk' />
              <Option value='Vaare-tjenester' label='Våre tjenester' />
              <Option value='Vaare-tjenester/Arealbruk-og-transport' label='Våre tjenester/Arealbruk og transport' />
              <Option value='Vaare-tjenester/Folkehelse' label='Våre tjenester/Folkehelse' />
              <Option value='Vaare-tjenester/Friluftsliv' label='Våre tjenester/Friluftsliv' />
              <Option value='Vaare-tjenester/Idrett' label='Våre tjenester/Idrett' />
              <Option value='Vaare-tjenester/Internasjonalt-arbeid' label='Våre tjenester/Internasjonalt arbeid' />
              <Option value='Vaare-tjenester/Klima-og-miljoe' label='Våre tjenester/Klima og miljø' />
              <Option value='Vaare-tjenester/Kultur' label='Våre tjenester/Kultur' />
              <Option value='Vaare-tjenester/Kulturminner' label='Våre tjenester/Kulturminner' />
              <Option value='Vaare-tjenester/Naeringsutvikling' label='Våre tjenester/Næringsutvikling' />
              <Option value='Vaare-tjenester/Tannhelse' label='Våre tjenester/Tannhelse' />
              <Option value='Vaare-tjenester/Utdanning' label='Våre tjenester/Utdanning' />
              <Option value='Vaare-tjenester/Verdensarv' label='Våre tjenester/Verdensarv' />
              <Option value='Planer' label='Planer' />
              <Option value='Fylkeskommunen' label='Fylkeskommunen' />
              <Option value='Om-Telemark' label='Om Telemark' />
              <Option value='Aktuelt' label='Aktuelt' />
            </Select>
            <Input name='limitDays' label='Vis eldre enn' floatingLabel defaultValue={this.state.limitDays} onChange={this.handleChange} />
            <Input name='filterBy' label='Dropp følgende mapper' floatingLabel defaultValue={this.state.filterBy} onChange={this.handleChange} />
            <Button variant='raised'>Oppdater listen</Button>
          </Form>
          <Loading loading={this.state.loading} />
          {
            this.state.pages.length > 0 ? <Articles pages={this.state.pages} /> : null
          }
        </Container>
      </div>
    )
  }
}
