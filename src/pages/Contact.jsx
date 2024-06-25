import React from 'react'

const Contact = () => {
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text_para">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label htmlFor="email" className="form_label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form_input mt-1"
              // required
            />
          </div>
          <div>
            <label htmlFor="subject" className="form_label">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Let us know how can we help you"
              className="form_input mt-1"
              // required
            />
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor="message" className="form_label">
              Your Message
            </label>
            <textarea
              rows={6} 
              id="message"
              type="text"
              placeholder="Leave a comment..."
              className="form_input mt-1"
              // required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn rounded sm:w-fit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact