'use strict'

import React from 'react'

export default class Articles extends React.Component {
  render () {
    return <div>
      <table>
        <thead>
          <tr>
            <th>Alder (dager)</th>
            <th>Plassering</th>
            <th>Rediger</th>
          </tr>
        </thead>
        <tbody>
          {
          this.props.pages.map(line =>
            <tr>
              <td>{line.age}</td>
              <td>{line.loc.replace('https://www.telemark.no', '')}</td>
              <td><a href='{line.loc}/siteadmin' target='_blank'>Endre</a></td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  }
}
