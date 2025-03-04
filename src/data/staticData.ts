// Health Topics
export const topics = [
  {
    id: 'nutrition',
    title: 'Nutrition & Healthy Eating',
    description: 'Learn about balanced diets, nutrients, and making healthy food choices.',
    icon: 'apple',
    color: 'bg-green-50',
    borderColor: 'border-green-200',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    lessons: 12,
    quizzes: 4,
    level: 'Beginner to Advanced'
  },
  {
    id: 'physical-activity',
    title: 'Physical Activity & Fitness',
    description: 'Discover the benefits of exercise and how to maintain an active lifestyle.',
    icon: 'activity',
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    lessons: 10,
    quizzes: 3,
    level: 'All Levels'
  },
  {
    id: 'mental-health',
    title: 'Mental Health & Wellbeing',
    description: 'Understand the importance of mental health and learn strategies for wellbeing.',
    icon: 'brain',
    color: 'bg-purple-50',
    borderColor: 'border-purple-200',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    lessons: 8,
    quizzes: 3,
    level: 'Beginner to Intermediate'
  },
  {
    id: 'personal-hygiene',
    title: 'Personal Hygiene',
    description: 'Learn essential hygiene practices to prevent illness and maintain health.',
    icon: 'shield',
    color: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    lessons: 6,
    quizzes: 2,
    level: 'Beginner'
  },
  {
    id: 'first-aid',
    title: 'First Aid & Safety',
    description: 'Learn basic first aid skills and safety measures for emergencies.',
    icon: 'heart',
    color: 'bg-red-50',
    borderColor: 'border-red-200',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    lessons: 7,
    quizzes: 2,
    level: 'Intermediate'
  },
  {
    id: 'health-literacy',
    title: 'Health Literacy',
    description: 'Develop skills to find, understand, and use health information effectively.',
    icon: 'book-open',
    color: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    image: 'https://images.unsplash.com/photo-1576094502599-0a1e73e7a7fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    lessons: 5,
    quizzes: 2,
    level: 'Advanced'
  }
];

// Course Content
export const courseContent = [
  {
    id: '1',
    topic_id: 'nutrition',
    title: 'Introduction to Nutrition',
    content_type: 'text',
    content: `
      <h2>Understanding Nutrition Basics</h2>
      <p>Nutrition is the science that interprets the nutrients and other substances in food in relation to maintenance, growth, reproduction, health and disease of an organism. It includes food intake, absorption, assimilation, biosynthesis, catabolism and excretion.</p>
      
      <h3>The Six Essential Nutrients</h3>
      <ul>
        <li><strong>Carbohydrates:</strong> The body's main source of energy</li>
        <li><strong>Proteins:</strong> Essential for building and repairing tissues</li>
        <li><strong>Fats:</strong> Necessary for energy, cell function, and nutrient absorption</li>
        <li><strong>Vitamins:</strong> Vital for various bodily functions</li>
        <li><strong>Minerals:</strong> Important for bone health, fluid balance, and other processes</li>
        <li><strong>Water:</strong> Essential for hydration and most bodily functions</li>
      </ul>
      
      <h3>The Importance of a Balanced Diet</h3>
      <p>A balanced diet provides all the nutrients your body needs to function correctly. It should include a variety of foods from all food groups in the right proportions.</p>
      
      <p>The key food groups include:</p>
      <ul>
        <li>Fruits and vegetables</li>
        <li>Grains and cereals</li>
        <li>Protein foods (meat, fish, eggs, legumes)</li>
        <li>Dairy products</li>
        <li>Healthy fats and oils</li>
      </ul>
    `
  },
  {
    id: '2',
    topic_id: 'nutrition',
    title: 'Macronutrients Explained',
    content_type: 'video',
    content: 'https://youtu.be/smPR215SRzM?feature=shared'
  },
  {
    id: '3',
    topic_id: 'physical-activity',
    title: 'Benefits of Regular Exercise',
    content_type: 'text',
    content: `
      <h2>Why Exercise Matters</h2>
      <p>Regular physical activity is one of the most important things you can do for your health. It can help:</p>
      
      <ul>
        <li>Control weight</li>
        <li>Reduce risk of cardiovascular disease</li>
        <li>Reduce risk for type 2 diabetes and metabolic syndrome</li>
        <li>Strengthen bones and muscles</li>
        <li>Improve mental health and mood</li>
        <li>Improve ability to do daily activities</li>
        <li>Increase chances of living longer</li>
      </ul>
      
      <h3>How Much Exercise Do You Need?</h3>
      <p>According to health experts, children and adolescents should get at least 60 minutes of physical activity daily. Adults should aim for:</p>
      
      <ul>
        <li>At least 150 minutes of moderate-intensity aerobic activity per week</li>
        <li>Muscle-strengthening activities on 2 or more days per week</li>
      </ul>
      
      <h3>Types of Physical Activity</h3>
      <p>There are different types of physical activity, each with unique benefits:</p>
      
      <ol>
        <li><strong>Aerobic Activity:</strong> Gets your heart beating faster (e.g., walking, running, swimming)</li>
        <li><strong>Muscle-Strengthening:</strong> Makes your muscles stronger (e.g., lifting weights, resistance bands)</li>
        <li><strong>Bone-Strengthening:</strong> Promotes bone growth and strength (e.g., jumping, running)</li>
        <li><strong>Stretching:</strong> Improves flexibility and range of motion</li>
        <li><strong>Balance:</strong> Helps prevent falls (e.g., yoga, tai chi)</li>
      </ol>
    `
  },
  {
    id: '4',
    topic_id: 'physical-activity',
    title: 'Getting Started with Exercise',
    content_type: 'video',
    content: 'https://youtu.be/U9ENCvFf9yQ?feature=shared'
  },
  {
    id: '5',
    topic_id: 'mental-health',
    title: 'Understanding Mental Health',
    content_type: 'text',
    content: `
      <h2>What is Mental Health?</h2>
      <p>Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices.</p>
      
      <p>Mental health is important at every stage of life, from childhood and adolescence through adulthood.</p>
      
      <h3>Factors That Contribute to Mental Health</h3>
      <p>Many factors contribute to mental health problems, including:</p>
      
      <ul>
        <li>Biological factors, such as genes or brain chemistry</li>
        <li>Life experiences, such as trauma or abuse</li>
        <li>Family history of mental health problems</li>
        <li>Lifestyle factors, such as diet, physical activity, and substance use</li>
      </ul>
      
      <h3>Signs of Mental Health Problems</h3>
      <p>Mental health problems can affect your thinking, mood, and behavior. Some common signs include:</p>
      
      <ul>
        <li>Feeling sad or down for extended periods</li>
        <li>Excessive fears or worries</li>
        <li>Extreme mood changes</li>
        <li>Withdrawal from friends and activities</li>
        <li>Significant tiredness or low energy</li>
        <li>Problems sleeping</li>
        <li>Difficulty perceiving reality</li>
        <li>Inability to cope with daily problems or stress</li>
      </ul>
      
      <h3>Maintaining Good Mental Health</h3>
      <p>There are many ways to maintain or improve your mental health, including:</p>
      
      <ul>
        <li>Staying physically active</li>
        <li>Getting enough sleep</li>
        <li>Eating a healthy diet</li>
        <li>Practicing mindfulness or meditation</li>
        <li>Developing coping skills for managing stress</li>
        <li>Building strong social connections</li>
        <li>Seeking professional help when needed</li>
      </ul>
    `
  },
  {
    id: '6',
    topic_id: 'mental-health',
    title: 'Stress Management Techniques',
    content_type: 'video',
    content: 'https://www.youtube.com/watch?v=0fL-pn80s-c'
  }
];

// Quizzes
export const quizzes = [
  {
    id: 'nutrition-basics',
    title: 'Nutrition Basics Quiz',
    description: 'Test your knowledge about fundamental nutrition concepts and healthy eating habits.',
    timeLimit: 10,
    questions: [
      {
        id: 'n1',
        text: 'Which of the following is NOT a macronutrient?',
        options: ['Carbohydrates', 'Proteins', 'Vitamins', 'Fats'],
        correctAnswer: 2,
        explanation: 'Vitamins are micronutrients, not macronutrients. The three macronutrients are carbohydrates, proteins, and fats.'
      },
      {
        id: 'n2',
        text: 'What is the main function of carbohydrates in the body?',
        options: ['Building muscle tissue', 'Providing energy', 'Storing vitamins', 'Regulating body temperature'],
        correctAnswer: 1,
        explanation: 'Carbohydrates are the body\'s main source of energy. They break down into glucose, which cells use for energy.'
      },
      {
        id: 'n3',
        text: 'Which food group should make up the largest portion of your plate according to the USDA MyPlate guidelines?',
        options: ['Proteins', 'Grains', 'Vegetables', 'Fruits'],
        correctAnswer: 2,
        explanation: 'According to the USDA MyPlate guidelines, vegetables should make up the largest portion of your plate, followed by grains, proteins, and fruits.'
      },
      {
        id: 'n4',
        text: 'Which vitamin is produced when your skin is exposed to sunlight?',
        options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin E'],
        correctAnswer: 2,
        explanation: 'Vitamin D is produced when your skin is exposed to sunlight. It\'s important for bone health and immune function.'
      },
      {
        id: 'n5',
        text: 'Which of these foods is the best source of protein?',
        options: ['Apples', 'Bread', 'Chicken', 'Butter'],
        correctAnswer: 2,
        explanation: 'Chicken is a lean meat and an excellent source of protein. Apples and bread contain minimal protein, while butter is primarily fat.'
      }
    ]
  },
  {
    id: 'physical-activity',
    title: 'Physical Activity Quiz',
    description: 'Test your knowledge about exercise, fitness, and maintaining an active lifestyle.',
    timeLimit: 10,
    questions: [
      {
        id: 'p1',
        text: 'How many minutes of moderate-intensity aerobic activity should adults aim for weekly?',
        options: ['At least 75 minutes', 'At least 150 minutes', 'At least 300 minutes', 'At least 500 minutes'],
        correctAnswer: 1,
        explanation: 'Adults should aim for at least 150 minutes of moderate-intensity aerobic activity per week, according to health guidelines.'
      },
      {
        id: 'p2',
        text: 'Which type of exercise is best for building muscle strength?',
        options: ['Aerobic exercises', 'Flexibility exercises', 'Resistance training', 'Balance exercises'],
        correctAnswer: 2,
        explanation: 'Resistance training, which includes weightlifting and bodyweight exercises, is best for building muscle strength.'
      },
      {
        id: 'p3',
        text: 'What is the recommended amount of physical activity for children and adolescents daily?',
        options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes'],
        correctAnswer: 2,
        explanation: 'Children and adolescents should get at least 60 minutes of physical activity daily.'
      },
      {
        id: 'p4',
        text: 'Which of these is NOT a benefit of regular physical activity?',
        options: ['Reduced risk of heart disease', 'Improved mood', 'Decreased bone density', 'Better sleep'],
        correctAnswer: 2,
        explanation: 'Regular physical activity actually increases bone density, not decreases it. All the other options are benefits of regular exercise.'
      },
      {
        id: 'p5',
        text: 'What is the best way to start an exercise routine if you\'ve been inactive?',
        options: ['Start with high-intensity workouts', 'Begin with short, easy sessions and gradually increase', 'Exercise for at least an hour daily', 'Focus only on cardio exercises'],
        correctAnswer: 1,
        explanation: 'If you\'ve been inactive, it\'s best to start with short, easy sessions and gradually increase the duration and intensity to avoid injury and burnout.'
      }
    ]
  },
  {
    id: 'mental-health',
    title: 'Mental Health & Wellbeing Quiz',
    description: 'Test your knowledge about mental health concepts, stress management, and emotional wellbeing.',
    timeLimit: 10,
    questions: [
      {
        id: 'm1',
        text: 'Which of the following is NOT a common sign of stress?',
        options: ['Headaches', 'Increased energy', 'Trouble sleeping', 'Irritability'],
        correctAnswer: 1,
        explanation: 'Increased energy is not typically a sign of stress. Stress usually causes fatigue and low energy. Common signs of stress include headaches, trouble sleeping, and irritability.'
      },
      {
        id: 'm2',
        text: 'What is mindfulness?',
        options: ['Thinking about the future', 'Being aware of the present moment without judgment', 'Analyzing past events', 'Avoiding negative thoughts'],
        correctAnswer: 1,
        explanation: 'Mindfulness is the practice of being aware of the present moment without judgment. It involves paying attention to your thoughts, feelings, and surroundings.'
      },
      {
        id: 'm3',
        text: 'Which of these activities can help reduce stress?',
        options: ['Consuming caffeine', 'Skipping meals', 'Regular exercise', 'Isolating yourself'],
        correctAnswer: 2,
        explanation: 'Regular exercise is a proven stress reducer. It releases endorphins, improves mood, and promotes better sleep. The other options can actually increase stress levels.'
      },
      {
        id: 'm4',
        text: 'What percentage of adolescents globally are estimated to have mental health conditions?',
        options: ['About 5%', 'About 10%', 'About 15%', 'About 20%'],
        correctAnswer: 2,
        explanation: 'According to the World Health Organization, about 15% of adolescents globally have mental health conditions.'
      },
      {
        id: 'm5',
        text: 'Which of these is an example of a healthy coping mechanism for stress?',
        options: ['Using alcohol to relax', 'Deep breathing exercises', 'Avoiding the stressor completely', 'Sleeping all day'],
        correctAnswer: 1,
        explanation: 'Deep breathing exercises are a healthy coping mechanism for stress. They activate the parasympathetic nervous system, which helps calm the body\'s stress response.'
      }
    ]
  }
];