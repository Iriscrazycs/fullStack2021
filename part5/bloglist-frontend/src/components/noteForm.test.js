import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event' 
import NoteForm from './noteForm' 

test('render new Blogs ', ()=>{
    const blog={
        title:'lightness',
        author:'milande',
        url:'www.ok.com'
    }

    render(<NoteForm props={blog}/>)
    //`${blog.title} ${blog.author}`
    const element=screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()

})

test('view button', async()=>{
    const mockHandler= jest.fn()

    render(
        <NoteForm />
    )
})