import React, { Component } from 'react'
import { CSVLink } from "react-csv"
import { CSVReader } from 'react-papaparse'
import { useTable, useSortBy } from 'react-table'

const buttonRef = React.createRef()

const BuildRow = ({row}) => {

return Array.isArray(row) ? row.map(item => <td >{item}</td>) : <td>{JSON.stringify(row)}</td>}
const BuildLine = ({row}) => row && <BuildRow row={row.data} />  

class Reader extends Component {

  constructor(props) {
    super(props)
    this.state = {
        showResult: false,
        result: [],
        disabled: true,
        deletedHeaderRow: null
      }
  }


    handleFirstRow = (e) => {

      const result = this.state.result

      result.shift()

      this.setState({
        result: result,
        disabled: true
      })
      
    }
      
  

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    this.setState({ showResult: true, result: data, disabled: false })
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')

  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    this.setState({ showResult: false, result: null })
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  handleClick = (item) => {
    console.log(item)
  }

  render() {
    return (
      <div>
      
      <CSVReader
        ref={buttonRef}
        onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
        onRemoveFile={this.handleOnRemoveFile}
      >
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10
            }}
          >
          <div>
            <button
              type='button'
              onClick={this.handleOpenDialog}
            >
              Browse file
            </button>
            </div>
            <div>
            <button type='button' disabled={this.state.disabled} onClick={() => this.handleFirstRow()}>
              Remove first row
            </button>
            </div>
            <div>
            <button onClick={this.handleRemoveFile}>
              Remove
            </button>
            </div>
            <div>
            <CSVLink data={this.state.result.map(datum => datum.data)}>{file && file.name}</CSVLink>
            </div>
          </aside>
        )}
      </CSVReader>
      <table className="Row">
      {this.state.result && Array.isArray(this.state.result) && this.state.result.map(item => <tr><td><input type="checkbox" onChange={(item => alert("Doesn't do anything yet"))}/></td> <BuildLine row={item}/> </tr>)}
      </table>
  
      </div>
    )
  }
}



export default Reader
