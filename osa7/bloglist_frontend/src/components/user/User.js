import React  from 'react'
import {Header, Table} from "semantic-ui-react";
import {connect} from "react-redux";

const User = (props) => {

  if(!props.user.username){
    return null
  }

  return (
    <div>
      <br/>
      <Header as='h2'>{props.user.name}</Header>
      <Header as='h4'>Added blogs</Header>
      <Table striped attached>
        <Table.Body>
          { props.user.blogs.map(blog =>
            <Table.Row key={ blog.id }>
              <Table.Cell>
                { blog.title }
              </Table.Cell>
              <Table.Cell>
                { blog.author }
              </Table.Cell>
            </Table.Row>
          ) }
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, null)(User)
