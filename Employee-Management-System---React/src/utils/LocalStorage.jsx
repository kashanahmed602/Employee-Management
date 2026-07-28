
  const admin = [{
    "id": 1,
    "email": "admin@me.com",
    "name": "Alice Johnson",
    "password": 123
  }]

  const employees = [
    {
      "id": 101,
      "email": "abc@me.com",
      "name": "John Doe",
      "password": "123",
      "tasks": [
        {
          "title": "User Login Authentication",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false,
          "date": "2025-08-20",
          " ": "Development",
          "description": "Implement user login authentication"
        },
        {
          "title": "Dashboard UI Fix",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false,
          "date": "2025-08-18",
          "category": "Bug Fix",
          "description": "Fix UI alignment issue on dashboard"
        },
        {
          "title": "Payment Module Tests",
          "active": false,
          "newTask": false,
          "completed": false,
          "failed": true,
          "date": "2025-08-15",
          "category": "Testing",
          "description": "Write test cases for payment module"
        },
        {
          "title": "API Documentation",
          "active": true,
          "newTask": false,
          "completed": false,
          "failed": false,
          "date": "2025-08-22",
          "category": "Documentation",
          "description": "Prepare API documentation"
        }
      ],
      "taskCounts": {
        "active": 2,
        "newTask": 1,
        "completedTask": 1,
        "failedTask": 1
      }
    },
    {
      "id": 102,
      "email": "sara@me.com",
      "name": "Sara Smith",
      "password": "123",
      "tasks": [
        {
          "title": "Frontend Redesign",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false,
          "date": "2025-08-20",
          "category": "Design",
          "description": "Redesign homepage layout"
        },
        {
          "title": "Accessibility Fixes",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false,
          "date": "2025-08-18",
          "category": "UI/UX",
          "description": "Improve accessibility features"
        },
        {
          "title": "Cross-Browser Testing",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false,
          "date": "2025-08-17",
          "category": "Testing",
          "description": "Test app across multiple browsers"
        },
        {
          "title": "Image Optimization",
          "active": false,
          "newTask": false,
          "completed": false,
          "failed": true,
          "date": "2025-08-15",
          "category": "Performance",
          "description": "Optimize images for faster loading"
        }
      ],
      "taskCounts": {
        "active": 1,
        "newTask": 1,
        "completedTask": 2,
        "failedTask": 1
      }
    },
    {
      "id": 103,
      "email": "ali@me.com",
      "name": "Ali Khan",
      "password": "123",
      "tasks": [
        {
          "title": "Database Backup",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false,
          "date": "2025-08-20",
          "category": "Database",
          "description": "Perform full database backup"
        },
        {
          "title": "Query Optimization",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false,
          "date": "2025-08-19",
          "category": "Database",
          "description": "Optimize slow queries"
        },
        {
          "title": "Schema Migration",
          "active": true,
          "newTask": false,
          "completed": false,
          "failed": false,
          "date": "2025-08-18",
          "category": "Database",
          "description": "Migrate schema for new features"
        },
        {
          "title": "Restore Drill",
          "active": false,
          "newTask": false,
          "completed": false,
          "failed": true,
          "date": "2025-08-16",
          "category": "Maintenance",
          "description": "Test restore procedure"
        }
      ],
      "taskCounts": {
        "active": 2,
        "newTask": 1,
        "completedTask": 1,
        "failedTask": 1
      }
    },
    {
      "id": 104,
      "email": "fatima@me.com",
      "name": "Fatima Noor",
      "password": "123",
      "tasks": [
        {
          "title": "Content Writing",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false,
          "date": "2025-08-21",
          "category": "Content",
          "description": "Write blog content for new release"
        },
        {
          "title": "SEO Optimization",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false,
          "date": "2025-08-19",
          "category": "Marketing",
          "description": "Optimize website for SEO"
        },
        {
          "title": "Ad Campaign Setup",
          "active": false,
          "newTask": false,
          "completed": false,
          "failed": true,
          "date": "2025-08-18",
          "category": "Marketing",
          "description": "Setup ad campaigns"
        },
        {
          "title": "Newsletter Draft",
          "active": true,
          "newTask": false,
          "completed": false,
          "failed": false,
          "date": "2025-08-20",
          "category": "Communication",
          "description": "Prepare monthly newsletter draft"
        }
      ],
      "taskCounts": {
        "active": 2,
        "newTask": 1,
        "completedTask": 1,
        "failedTask": 1
      }
    }
  ]



export const setItem = () => {
    localStorage.setItem('employees',JSON.stringify(employees));
    localStorage.setItem('admin',JSON.stringify(admin));
}

export const getItem = ()=> {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const admin = JSON.parse(localStorage.getItem('admin'))

    return {employees,admin};
}