'use strict'

import React from 'react'
const config = require('../config')

export default class Articles extends React.Component {
  render () {
    return <div>
      <table className='fullWidth'>
        <thead>
          <tr>
            <th>Dager</th>
            <th>Plassering</th>
            <th>Vis</th>
            <th>Endre</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.pages.map((line, index) =>
              <tr key={index}>
                <td>{line.age}</td>
                <td>{line.loc.replace(config.baseUrl, '')}</td>
                <td><a href={line.loc} target='_blank'>Vis</a></td>
                <td><a href={line.loc.replace(config.baseUrl, `${config.baseUrl}/siteadmin`)} target='_blank'>Endre</a></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  }
}
