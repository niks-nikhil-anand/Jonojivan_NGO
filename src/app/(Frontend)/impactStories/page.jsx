"use client"
import React, { useState } from 'react';

// Example stories array
const stories = [
    {
      name: "Shaziya",
      location: "Ara, Bihar",
      story: `Shaziya’s laughter once echoed only within the four walls of her small, dimly lit home. Born into a family struggling to make ends meet, her dreams of going to school were buried under the weight of poverty and societal expectations. As the eldest daughter, she was expected to help at home, not hold a book or dream of a brighter future.
  But Shaziya’s life changed when Bring Smile Foundation stepped in. Through our Child Sponsorship Program, Shaziya was enrolled at Bloomfield International School. For the first time, she wore a uniform, carried a school bag, and wrote her name in a notebook.
  Today, Shaziya is not just a student—she’s a role model. She dreams of becoming a teacher, so she can inspire other girls in her community to believe in themselves. Her smile is a testament to the power of education and the transformative impact of sponsorship.`,
      callToAction: "Your support can rewrite more stories like Shaziya’s. Sponsor a child today and bring a lifetime of smiles.",
    },
    {
      name: "Anamika",
      location: "Bhojpur, Bihar",
      story: `Anamika grew up in a small village where girls rarely set foot in classrooms. Her father, a daily wage laborer, struggled to feed the family, and education was considered a luxury they couldn’t afford. For Anamika, the dream of holding a pencil or reading a book seemed impossibly far away.
  When Bring Smile Foundation discovered Anamika’s situation, her story became our mission. Through our Child Sponsorship Program, she was given the opportunity to join Bloomfield International School. Today, she not only attends school but excels in her studies, dreaming of becoming a doctor to serve her community.
  Anamika’s journey is a powerful reminder of what’s possible when someone believes in a child. Her courage and determination are an inspiration, showing that even the most challenging circumstances can be overcome with a little support.`,
      callToAction: "You can be the turning point in a child’s story, just like Anamika’s. Sponsor a child and help them create a future filled with hope and possibilities.",
    },
    {
      name: "Priya",
      location: "Ara, Bihar",
      story: `Priya was born into a world where the value of a girl’s education was often overlooked. Her family struggled to make ends meet, and as the eldest daughter, Priya was expected to help with household chores and care for her younger siblings. The idea of her going to school seemed impossible—after all, there were other priorities.
  But Priya’s heart longed for something more. She watched her brothers walk to school every day with books in their hands and hope in their eyes. She dreamed of wearing a school uniform, carrying a bag full of knowledge, and having a future beyond the walls of her home.
  When Bring Smile Foundation learned about Priya’s situation, everything changed. Through the Child Sponsorship Program, Priya was enrolled at Bloomfield International School. For the first time in her life, she was given the opportunity to learn and grow.
  Today, Priya is an ambitious student with big dreams. She excels in her studies and has become a shining example of what is possible when a girl is given the chance to succeed. Priya aspires to become an IAS officer, using her education to fight for justice and equality in her community.`,
      callToAction: "With your support, you can help more girls like Priya rewrite their stories and create a future full of possibilities.",
    },
    {
      name: "Anshika",
      location: "Bhojpur, Bihar",
      story: `Anshika’s childhood was one of silent longing. Born into a family where education for girls was seen as unnecessary, she spent her days helping her mother with household chores, caring for her younger siblings, and watching the world of school slip further away. Her dream of learning was a distant hope, overshadowed by the harsh realities of her environment.
  But Anshika’s heart never stopped dreaming. She would sneak glances at the books her brothers brought home from school, longing for the chance to read and learn. She wanted to break free from the cycle of poverty and limitations imposed on girls like her.
  When Bring Smile Foundation discovered Anshika, her life began to change. Through the Child Sponsorship Program, she was enrolled in Bloomfield International School, where she finally found the opportunity to learn.
  Today, Anshika is thriving academically, with dreams that stretch far beyond her village. She dreams of becoming a doctor, not only to help those in need but also to inspire other girls in her community to chase their dreams, just as she has.`,
      callToAction: "Your support can give girls like Anshika the chance they deserve. Sponsor a child today and help transform a life.",
    },
    {
      name: "Ayesha",
      location: "Ara, Bihar",
      story: `Ayesha’s life was shaped by the daily struggles of her family. Her father worked as a daily wage laborer, and her mother did her best to make ends meet by doing odd jobs. Education was a luxury they could not afford, and Ayesha, like many girls in her village, was expected to stay at home, helping with chores and caring for her younger siblings.
  Despite the limitations imposed on her, Ayesha always dreamed of something more. She loved listening to the stories her friends shared about their school experiences and often found herself lost in daydreams of sitting at a desk, learning new things. She wanted to become someone important, someone who could help others.
  When Bring Smile Foundation learned about Ayesha, everything changed. Through the Child Sponsorship Program, Ayesha was given the opportunity to attend Bloomfield International School. She was enrolled in classes and quickly discovered a love for learning that she had never known was possible.`,
      callToAction: "Your sponsorship can change a life like Ayesha’s. Give the gift of education today and make a lasting impact.",
    },
    {
        name: "Sana’s Story",
        location: "Bhojpur, Bihar",
        story: `Sana’s days were filled with endless chores, cooking, cleaning, and taking care of her younger siblings. In her community, girls were expected to stay at home and contribute to the household, while boys went to school to build their futures. Education was not considered a priority for girls like Sana, and her dreams of learning seemed distant and out of reach.
But Sana’s heart held a quiet hope—she dreamed of becoming a doctor, to heal the sick and help the poor, just like the doctors she had seen in her village. Yet, she knew that without an education, that dream would remain just that—a dream.
When Bring Smile Foundation heard about Sana, everything changed. Through our Child Sponsorship Program, Sana was enrolled in Bloomfield International School. For the first time, she had the chance to sit in a classroom, wear a uniform, and hold a textbook in her hands.
Sana flourished in her studies and became a source of inspiration to her family and friends. She is now more determined than ever to become a doctor and to make a difference in her community.
Sana’s story is a testament to the transformative power of education—the gift that can turn a dream into a reality.
`,
        callToAction: "With your support, girls like Sana can change their futures. Sponsor a child today and be the reason a dream comes true",
      },
  ]


const StoryCard = ({ title, location, description, callToAction }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">Location: {location}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="font-semibold text-blue-600">{callToAction}</p>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 3; // Number of stories per page

  // Calculate the start and end index for pagination
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  // Handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(stories.length / storiesPerPage);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Transforming Lives, One Story at a Time
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Explore the inspiring stories of change made possible by your generosity.  
          Together, we can continue to make a lasting impact in countless lives.
        </p>
        
        {/* Display the current stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentStories.map((story, index) => (
            <StoryCard
              key={index}
              title={story.name}
              location={story.location}
              description={story.story}
              callToAction={story.callToAction}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'} rounded-lg mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages} 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
