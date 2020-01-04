import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useHistory} from "react-router-dom";

import {Header, Table} from "semantic-ui-react";

import {initializeUsers} from '../../reducers/usersReducer'
import {initializeUser} from  '../../reducers/userReducer'

const Users = (props) => {
  let history = useHistory();

  useEffect(() => {
    props.initializeUsers()
  }, [])

  const handleClick = id => {
    const user = props.users.find(u => u.id === id)
    props.initializeUser(user)
    history.push(`/user/${ id }`)
  }

  return (
    <div>
      <br/>
      <Header as='h2'>Users</Header>

      <Table striped attached selectable>

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { props.users.map(user =>
            <Table.Row
              key={ user.id }
              onClick={ () => {
                handleClick(user.id)
              } }
            >
              <Table.Cell>
                { user.name }
              </Table.Cell>
              <Table.Cell>
                { user.blogs.length }
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
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeUsers,
  initializeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)