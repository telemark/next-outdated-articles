'use strict'

import React from 'react'
const config = require('../config')

export default class Articles extends React.Component {
  render () {
    return <div>
      <table>
        <thead>
          <tr>
            <th>Dager</th>
            <th>Plassering</th>
            <th>Rediger</th>
          </tr>
        </thead>
        <tbody>
          {
          this.props.pages.map(line =>
            <tr>
              <td>{line.age}</td>
              <td>{line.loc.replace(config.baseUrl, '')}</td>
              <td><a href={line.loc.replace(config.baseUrl, `${config.baseUrl}/siteadmin`)} target='_blank'>Endre</a></td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  }
}
