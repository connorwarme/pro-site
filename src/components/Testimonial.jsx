import { useState } from 'preact/hooks';
import arrow from "../images/icons/arrow-simple.svg"

// "Before I started working with Amity, I struggled with my weight, energy levels, and had an unhealthy relationship with food - particularly carbohydrates. Amity took the time to truly understand my unique needs and goals. She helped me design a personalized nutrition plan that was easy to follow and tailored to my specific dietary preferences. She also provided me with the knowledge and tools to make sustainable, long-term changes to my eating habits.
// Amity has been a constant source of support and motivation. She is not only incredibly knowledgeable, but also an excellent communicator, explaining complex concepts in a way that's easy to understand.
// As a result of Amity's guidance, I've achieved remarkable progress. I've lost weight, gained more energy, and developed a healthier attitude towards food. I now have the tools and knowledge to make informed choices that benefit my health. My relationship with food has been transformed, and I no longer feel overwhelmed or guilty about what I eat.
// I wholeheartedly recommend Amity to anyone seeking to improve their health and well-being through nutrition."
export default function Testimonial({ intel }) {
  const [showFull, setShowFull] = useState(false);
  
  const handleShow = () => {
    setShowFull(!showFull)
  }

  return (
    <>
      <div className="testimonial-unit-container">
        <div className="testimonial-text-container">
          { !showFull && <p>"{intel.clip}"<img class='jump-arrow' src={arrow} aria-label="Click to reveal links" onClick={handleShow} /></p> }
          { showFull && <p>"{intel.full}"<img class='jump-arrow visible' src={arrow} aria-label="Click to reveal links" onClick={handleShow} /></p> }
        </div>
        <p><em>- {intel.client}</em></p>
      </div>
    </>
  )
}