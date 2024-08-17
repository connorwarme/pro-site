import { useState } from 'preact/hooks';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [firstErr, setFirstErr] = useState(null)
  const [familyName, setFamilyName] = useState('');
  const [familyErr, setFamilyErr] = useState(null)
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(null)
  const [message, setMessage] = useState('');
  const [msgErr, setMsgErr] = useState(null)
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isPending, setPending] = useState(false);

  const buildName = () => {
    let name = '';
    if (firstName.length > 0) {
      name = `${firstName},`;
    } 
    else if (familyName.length > 0) {
      name = `${firstName} ${familyName},`;
    }
    return name;
  }
  const handleErrors = (array) => {
    const errorArray = Array.from(array)
    errorArray.forEach(err => {
      if (err.path) {
        if (err.path === 'first_name') {
          setFirstErr(true)
        } 
        else if (err.path === 'family_name') {
          setFamilyErr(true)
        } 
        else if (err.path === 'email') {
          setEmailErr(true)
        } 
        else if (err.path === 'message') {
          setMsgErr(true)
        } 
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);

    fetch("https://dubmailer.fly.dev/contact", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName, 
        family_name: familyName, 
        email: email, 
        message: message,
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.errors) {
        setSuccess(false)
        // display specific errors, highlight error fields, reload previously submitted data
        handleErrors(data.errors)
        setError(data.errors)
        // instead of the generic error
        // setError('Apologies! There was an error sending your message. Please refresh the page to try again, or email amity@amitywarme.com. Sorry for the inconvenience!')
      } else {
        setSuccess(true)
      }
      setPending(false);

      // console.log(data)
    })
    .catch(e => {
      console.log(e)
      setSuccess(false)
      setPending(false)
      setError('Apologies! There was an error sending your message. Please refresh the page to try again, or email amity@amitywarme.com. Sorry for the inconvenience!');
    })
  }

  
  return (
    <div class="form-wrapper">
      <div class="message-wrapper">
        {/* { error.length > 0 && <p>{error}</p> } */}
        { success && <div class="success-wrapper">
          <p class="success-contact-name">{buildName()}</p>
          <p>Thank you for your message! I will get back with you soon.</p>
          <a href="/" class="return-home">Return to Home</a>
        </div> }
      </div>
      { !success && <form class="contact-form" onSubmit={handleSubmit}>
        { error.length === 0 && <p>I'd love to hear from you!</p> }
        <input type="text" name="_honey" style="display:none" ></input>
        <label for="first-name">
          <span>First Name:</span>
          <input 
            type="text" 
            id="first-name" 
            name="first_name" 
            placeholder="First Name*" 
            maxlength="256" 
            onChange={(e) => setFirstName(e.target.value)}
            required>
              {firstName}
            </input>
          <span class="error" aria-live="polite"></span>
        </label>
        <label for="family-name">
          <span>Family Name:</span>
          <input 
            type="text" 
            id="family-name" 
            name="family_name" 
            placeholder="Family Name" 
            maxlength="256"
            onChange={(e) => setFamilyName(e.target.value)}>
              {familyName}
            </input>
          <span class="error" aria-live="polite"></span>
        </label>
        <label for="email">
          <span>Your Email:</span>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email*" 
            maxlength="256" 
            onChange={(e) => setEmail(e.target.value)}
            required>
              {email}
            </input>
          <span class="error" aria-live="polite"></span>
        </label>
        <label for="message">
          <span>Your Message:</span>
          <textarea 
            id="message" 
            name="message" 
            placeholder="Message" 
            maxlength="5000" 
            value={message}
            onInput={(e) => setMessage(e.target.value)}
            required />
          <span class="error" aria-live="polite"></span>
        </label>
        { error && (
          <div className="errors-container">
            { !Array.isArray(error) && (
              <div>{error}</div>
            )}
            { Array.isArray(error) && (
              error.map((err, index) => <div key={index}>"{err.msg}" error in input field: {err.path}</div> )
            )}
          </div>
        )}
        { !isPending && <button 
          type="submit" 
          id="submit-btn">
            Submit
          </button> }
        { (isPending && (!error)) && <button
          id="pseudo-submit-btn"
          disabled>
            Sending...
          </button> }
        { (isPending && (error.length > 0)) && <button
          id="pseudo-submit-btn"
          disabled>
            Error!
          </button>
          }
      </form> }
    </div>
  )
}