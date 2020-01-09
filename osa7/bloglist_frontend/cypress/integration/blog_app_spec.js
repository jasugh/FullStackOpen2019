describe('Bloglist ', function () {

  const user = {
    name: 'Eka User',
    username: 'ekauser',
    password: 'salainen'
  }

  const blog = {
    title: 'Uusi blogi tälle päivälle',
    author: 'Testi Author',
    url: 'urlia@jossain',
    comment:'räväköiden kommenttien ystäville'
  }

  describe('user not logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
      cy.visit('http://localhost:3000')
      cy.contains('Login')
    })

    it('login works', function () {
      cy.visit('http://localhost:3000/login')
      cy.get('input[name=username]').type(user.username)
      cy.get('input[name=password]').type(user.password)
      cy.get('button[type=submit]').click()
      cy.contains(`${ user.name } logged in`)
    })
  })

  describe('user logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000/login')
      cy.get('input[name=username]').type(user.username)
      cy.get('input[name=password]').type(user.password)
      cy.get('button[type=submit]').click()
    })

    it('add a new blog with false input', function () {
      cy.get('[cy-name=createBlog]').click()
      cy.get('input[name=title]').type(blog.title)
      cy.get('input[name=author]').type(blog.author)
      cy.get('input[name=url]').type('uu')
      cy.get('[cy-name=create]').click()
      cy.wait(6000)
      cy.contains(blog.comment).should('not.exist')
    })

    it('add a new blog ', function () {
      cy.get('[cy-name=createBlog]').click()
      cy.get('input[name=title]').type(blog.title)
      cy.get('input[name=author]').type(blog.author)
      cy.get('input[name=url]').type(blog.url)
      cy.get('[cy-name=create]').click()
      cy.wait(6000)
      cy.contains(blog.title)
    })

    it('commnet the new blog ', function () {
      cy.contains(blog.title).click()
      cy.get('input[name=comment]').type(blog.comment)
      cy.get('[cy-name=comment]').click()
      cy.wait(6000)
      cy.contains(blog.comment)
    })

    it('like the new blog ', function () {
      cy.contains(blog.title).click()
      cy.get('[cy-name=like]').click()
      cy.wait(6000)
      cy.contains('Likes 1')
    })

    it('delete the new blog ', function () {
      cy.contains(blog.title).click()
      cy.get('[cy-name=delete_blog]').click()
      cy.wait(6000)
      cy.contains(blog.comment).should('not.exist')
    })

    it('logout works', function () {
      cy.get('[cy-name=logout]').click()
      cy.contains('Login')
    })
  })
})