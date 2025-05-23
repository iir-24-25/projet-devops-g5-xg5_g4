import { Quiz } from '../types';

export const availableQuizzes: Quiz[] = [
  {
    id: '101',
    title: 'Data Structures Fundamentals',
    category: 'Computer Science',
    difficulty: 'intermediate',
    timeLimit: 30,
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: `101-q${i+1}`,
      text: `What data structure would be most efficient for ${i % 5 === 0 ? 'implementing a queue' : i % 5 === 1 ? 'searching in a sorted array' : i % 5 === 2 ? 'representing a hierarchical structure' : i % 5 === 3 ? 'implementing a priority queue' : 'implementing a cache'}?`,
      options: i % 5 === 0 
        ? ['Array', 'Linked List', 'Hash Map', 'Binary Tree']
        : i % 5 === 1 
          ? ['Linear Search', 'Binary Search', 'Depth-First Search', 'Breadth-First Search']
          : i % 5 === 2 
            ? ['Array', 'Graph', 'Tree', 'Hash Table']
            : i % 5 === 3 
              ? ['Stack', 'Queue', 'Heap', 'Linked List']
              : ['LRU Cache', 'Hash Map', 'Array', 'Linked List'],
      correctAnswer: i % 4,
    })),
  },
  {
    id: '102',
    title: 'Advanced Algorithms',
    category: 'Computer Science',
    difficulty: 'advanced',
    timeLimit: 25,
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: `102-q${i+1}`,
      text: `What is the time complexity of ${i % 5 === 0 ? 'quicksort in the average case' : i % 5 === 1 ? 'bubble sort in the worst case' : i % 5 === 2 ? 'binary search' : i % 5 === 3 ? 'depth-first search on a graph' : 'finding the shortest path using Dijkstra\'s algorithm'}?`,
      options: i % 5 === 0 
        ? ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)']
        : i % 5 === 1 
          ? ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)']
          : i % 5 === 2 
            ? ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)']
            : i % 5 === 3 
              ? ['O(V + E)', 'O(V log V)', 'O(V²)', 'O(E log V)']
              : ['O(V + E)', 'O(V log V + E)', 'O(V²)', 'O(E log V)'],
      correctAnswer: i % 5 === 0 ? 1 : i % 5 === 1 ? 2 : i % 5 === 2 ? 3 : i % 5 === 3 ? 0 : 1,
    })),
  },
  {
    id: '103',
    title: 'System Design Principles',
    category: 'Software Engineering',
    difficulty: 'advanced',
    timeLimit: 35,
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: `103-q${i+1}`,
      text: `Which design pattern would be most appropriate for ${i % 5 === 0 ? 'creating objects without specifying their concrete classes' : i % 5 === 1 ? 'defining a family of algorithms' : i % 5 === 2 ? 'ensuring a class has only one instance' : i % 5 === 3 ? 'adding responsibilities to objects dynamically' : 'representing part-whole hierarchies'}?`,
      options: i % 5 === 0 
        ? ['Factory Method', 'Singleton', 'Observer', 'Adapter']
        : i % 5 === 1 
          ? ['Strategy', 'Template Method', 'Command', 'Mediator']
          : i % 5 === 2 
            ? ['Singleton', 'Factory Method', 'Builder', 'Prototype']
            : i % 5 === 3 
              ? ['Decorator', 'Composite', 'Proxy', 'Flyweight']
              : ['Composite', 'Decorator', 'Bridge', 'Facade'],
      correctAnswer: i % 5 === 0 ? 0 : i % 5 === 1 ? 0 : i % 5 === 2 ? 0 : i % 5 === 3 ? 0 : 0,
    })),
  },
  {
    id: '104',
    title: 'Web Development Basics',
    category: 'Web Development',
    difficulty: 'beginner',
    timeLimit: 20,
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: `104-q${i+1}`,
      text: `What is the primary purpose of ${i % 5 === 0 ? 'HTML in web development' : i % 5 === 1 ? 'CSS in web development' : i % 5 === 2 ? 'JavaScript in web development' : i % 5 === 3 ? 'HTTP protocol' : 'cookies in web applications'}?`,
      options: i % 5 === 0 
        ? ['To define the structure of content', 'To style the content', 'To add interactivity', 'To communicate with servers']
        : i % 5 === 1 
          ? ['To define the structure of content', 'To style the content', 'To add interactivity', 'To communicate with servers']
          : i % 5 === 2 
            ? ['To define the structure of content', 'To style the content', 'To add interactivity', 'To communicate with servers']
            : i % 5 === 3 
              ? ['To define page structure', 'To transfer data between client and server', 'To style content', 'To store user information']
              : ['To define page structure', 'To transfer data', 'To store user state information', 'To add animations'],
      correctAnswer: i % 5 === 0 ? 0 : i % 5 === 1 ? 1 : i % 5 === 2 ? 2 : i % 5 === 3 ? 1 : 2,
    })),
  },
];