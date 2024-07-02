-- asyncnewui_project table
CREATE TABLE asyncnewui_project (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo TEXT,
  created_by VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- asyncnewui_users table
CREATE TABLE asyncnewui_users (
  id SERIAL PRIMARY KEY,
  walletAddress VARCHAR(255) NOT NULL UNIQUE,
  provider VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- asyncnewui_task table
CREATE TABLE asyncnewui_task (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(255),
  eta VARCHAR(255),
  created_by VARCHAR(255) NOT NULL,
  projectId VARCHAR(255) NOT NULL,
  amount NUMERIC,
  transactionHash TEXT,
  taskhash TEXT,
  taskDoneTime TIMESTAMPTZ,
  tag VARCHAR(255),
  link TEXT,
  claimedHash TEXT,
  assignedTo VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- asyncnewui_task_startedby table
CREATE TABLE asyncnewui_task_startedby (
  id SERIAL PRIMARY KEY,
  taskId INT NOT NULL,
  userId INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (taskId) REFERENCES asyncnewui_task(id),
  FOREIGN KEY (userId) REFERENCES asyncnewui_users(id)
);

-- asyncnewui_task_submission table
CREATE TABLE asyncnewui_task_submission (
  id SERIAL PRIMARY KEY,
  taskId INT NOT NULL,
  codelink TEXT,
  comments TEXT,
  outputlink TEXT,
  submittedBy VARCHAR(255),
  status VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (taskId) REFERENCES asyncnewui_task(id)
);

-- asyncnewui_task_images table
CREATE TABLE asyncnewui_task_images (
  id SERIAL PRIMARY KEY,
  taskId INT NOT NULL,
  url TEXT,
  FOREIGN KEY (taskId) REFERENCES asyncnewui_task(id)
);

-- asyncnewui_images table
CREATE TABLE asyncnewui_images (
  id SERIAL PRIMARY KEY,
  taskId INT NOT NULL,
  submissionId INT NOT NULL,
  url TEXT,
  FOREIGN KEY (taskId) REFERENCES asyncnewui_task(id),
  FOREIGN KEY (submissionId) REFERENCES asyncnewui_task_submission(id)
);

-- asyncnewui_tokens table
CREATE TABLE asyncnewui_tokens (
  id SERIAL PRIMARY KEY,
  tokenAddress VARCHAR(255),
  tokenDecimals INT,
  tokenName VARCHAR(255),
  tokenNetwork VARCHAR(255),
  tokenSymbol VARCHAR(255)
);

-- asyncnewui_project_chats table
CREATE TABLE asyncnewui_project_chats (
  id SERIAL PRIMARY KEY,
  projectId INT NOT NULL,
  userId INT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (projectId) REFERENCES asyncnewui_project(id),
  FOREIGN KEY (userId) REFERENCES asyncnewui_users(id)
);
