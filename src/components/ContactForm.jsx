import { useState } from 'preact/hooks';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);

    fetch("https://formsubmit.co/ajax/9df28410a796feb69f63a79cfffc45d5", {
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
        setSuccess(true);
        setPending(false);
      })
      .catch(error => {
        console.log(error);
        setError('Apologies! There was an error sending your message. Please refresh the page to try again, or contact me on Instagram. Sorry for the inconvenience!');
      });
  }

  
  return (
    <div class="form-wrapper">
      <div class="message-wrapper">
        { error.length > 0 && <p>{error}</p> }
        { success && <div class="success-wrapper">
          <p class="success-contact-name">{buildName()}</p>
          <p>Thank you for your message! I will get back with you soon.</p>
          <a href="/" class="return-home">Return to Home</a>
        </div> }
      </div>
      { !success && <form class="contact-form" onSubmit={handleSubmit}>
        { error.length === 0 && <p>I'd love to hear from you!</p> }
        <input type="text" name="_honey" style="display:none" ></input>
        <input type="hidden" name="_captcha" value="false"  ></input>
        <input type="hidden" name="_subject" value="Contact request from website!"></input>
        <input type="hidden" name="_template" value="table" ></input>
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
        { !isPending && <button 
          type="submit" 
          id="submit-btn">
            Submit
          </button> }
        { (isPending && (error.length == 0)) && <button
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