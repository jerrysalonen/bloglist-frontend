const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      id: '5cb082957d070801d8a58c2b',
      username: 'testi',
      name: 'Jerry'
    }
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      id: '5cb082957d070801d8a58c2b',
      username: 'testi',
      name: 'Jerry'
    }
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      id: '5cb082957d070801d8a58c2b',
      username: 'testi',
      name: 'Jerry'
    }
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: {
      id: '5cb082957d070801d8a58c2b',
      username: 'testi',
      name: 'Jerry'
    }
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: {
      id: '5cb082957d070801d8a58c2b',
      username: 'testi',
      name: 'Jerry'
    }
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: {
      id: '5cb082957d070801d8a58c2b',
      username: 'testi',
      name: 'Jerry'
    }
  }
]


const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => { return null }

export default { getAll, setToken }