import { useState } from 'preact/hooks';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://formsubmit.co/d3a941f5652a2e6a2dce66170423a79f", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName, 
        family_name: familyName, 
        email: email, 
        message: message
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }
  
  return (
    <div class="form-wrapper">
      <p>{error}</p>
      <form class="contact-form" onSubmit={handleSubmit}> 
        <input type="text" name="_honey" style="display:none" />
        <input type="hidden" name="_captcha" value="false"  />
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
            onChange={(e) => setMessage(e.target.value)}
            required />
          <span class="error" aria-live="polite"></span>
        </label>
        <button 
          type="submit" 
          id="submit-btn">
            Submit
          </button>
        <p>{firstName}</p>
        <p>{familyName}</p>
      </form>
    </div>
  )
}