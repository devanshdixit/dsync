import gql from "graphql-tag";

export const createProjectQuery = /* GraphQL */ `
  mutation MyMutation(
    $category: String!
    $created_by: String!
    $logo: String!
    $name: String!
  ) {
    insert_asyncnewui_project_one(
      object: {
        category: $category
        created_by: $created_by
        logo: $logo
        name: $name
      }
    ) {
      id
      name
    }
  }
`;

export const getProjectByName = /* GraphQL */ `
  query getProjectByName($name: String!) {
    asyncnewui_project(where: { name: { _eq: $name } }) {
      name
      id
      logo
      updated_at
      created_by
      created_at
      category
    }
  }
`;

export const getUserByWalletId = /* GraphQL */ `
  query getUserByWalletId($walletAddress: String!) {
    asyncnewui_users(where: { walletAddress: { _eq: $walletAddress } }) {
      id
      walletAddress
      provider
      created_at
      updated_at
    }
  }
`;

export const createUser = /* GraphQL */ `
  mutation createUser($provider: String!, $walletAddress: String!) {
    insert_asyncnewui_users_one(
      object: { provider: $provider, walletAddress: $walletAddress }
    ) {
      id
      walletAddress
      updated_at
      provider
      created_at
    }
  }
`;

export const getProjectById = /* GraphQL */ `
  query getProjectByName($projectId: Int!) {
    asyncnewui_project(where: { id: { _eq: $projectId } }) {
      name
      id
      logo
      updated_at
      created_by
      created_at
      category
    }
  }
`;

export const createTask = /* GraphQL */ `
  mutation createTask(
    $eta: String!
    $projectId: String!
    $status: String!
    $title: String!
    $createdBy: String!
  ) {
    insert_asyncnewui_task_one(
      object: {
        eta: $eta
        projectId: $projectId
        status: $status
        title: $title
        created_by: $createdBy
      }
    ) {
      id
      title
    }
  }
`;

export const getTaskByStatus = /* GraphQL */ `
  query getTaskByStatus($status: String!, $projectId: String!) {
    asyncnewui_task(
      where: { status: { _eq: $status }, projectId: { _eq: $projectId } }
    ) {
      amount
      updated_at
      transactionHash
      title
      taskhash
      taskDoneTime
      tag
      status
      projectId
      id
      link
      description
      eta
      created_at
      claimedHash
      assignedTo
      created_by
    }
  }
`;

export const getProjectTaskById = /* GraphQL */ `
  query getProjectTaskById(
    $taskId: Int!
    $projectIdString: String!
    $projectId: Int!
  ) {
    asyncnewui_task(
      where: { id: { _eq: $taskId }, projectId: { _eq: $projectIdString } }
    ) {
      amount
      updated_at
      transactionHash
      title
      taskhash
      taskDoneTime
      tag
      status
      projectId
      id
      link
      description
      eta
      created_at
      claimedHash
      assignedTo
      created_by
    }
    asyncnewui_project(where: { id: { _eq: $projectId } }) {
      name
      id
      logo
      updated_at
      created_by
      created_at
      category
    }
    asyncnewui_task_startedby(where: { taskId: { _eq: $taskId } }) {
      userId
      id
      updated_at
      taskId
      created_at
    }
    asyncnewui_task_submission(where: { taskId: { _eq: $taskId } }) {
      codelink
      comments
      created_at
      id
      outputlink
      submittedBy
      status
      taskId
      updated_at
    }
    asyncnewui_task_images(where: { taskId: { _eq: $taskId } }) {
      url
      id
    }
  }
`;

export const getSubmissionById = /* GraphQL */ `
  query getSubmissionById(
    $taskId: Int!
    $projectIdString: String!
    $projectId: Int!
    $submissionId: Int!
  ) {
    asyncnewui_task(
      where: { id: { _eq: $taskId }, projectId: { _eq: $projectIdString } }
    ) {
      amount
      updated_at
      transactionHash
      title
      taskhash
      taskDoneTime
      tag
      status
      projectId
      id
      link
      description
      eta
      created_at
      claimedHash
      assignedTo
      created_by
    }
    asyncnewui_project(where: { id: { _eq: $projectId } }) {
      name
      id
      logo
      updated_at
      created_by
      created_at
      category
    }
    asyncnewui_task_startedby(where: { taskId: { _eq: $taskId } }) {
      userId
      id
      updated_at
      taskId
      created_at
    }
    asyncnewui_task_submission(where: { taskId: { _eq: $taskId } }) {
      codelink
      comments
      created_at
      id
      outputlink
      submittedBy
      status
      taskId
      updated_at
    }
    asyncnewui_images(
      where: { taskId: { _eq: $taskId }, submissionId: { _eq: $submissionId } }
    ) {
      url
      id
    }
  }
`;

export const getTokens = /* GraphQL */ `
  query getTokens {
    asyncnewui_tokens {
      id
      tokenAddress
      tokenDecimals
      tokenName
      tokenNetwork
      tokenSymbol
    }
  }
`;

export const deleteTask = /* GraphQL */ `
  mutation MyMutation($id: Int!) {
    delete_asyncnewui_task_by_pk(id: $id) {
      id
    }
  }
`;

export const getAllProject = /* GraphQL */ `
  query getAllProject {
    asyncnewui_project {
      name
      id
      logo
      category
      updated_at
      created_by
      created_at
    }
  }
`;

export const getAllTasks = /* GraphQL */ `
  query getAllTask {
    asyncnewui_task(where: { status: { _neq: "Draft" } }) {
      eta
      id
      projectId
      description
      tag
      status
      title
      amount
      created_by
      created_at
      updated_at
    }
  }
`;
export const getTaskCreatedBy = /* GraphQL */ `
  query getTaskCreatedBy($projectId: String!) {
    asyncnewui_task(
      where: { projectId: { _eq: $projectId } }
      order_by: { created_at: desc }
    ) {
      title
      created_by
      created_at
    }
  }
`;

export const getProjectChatsById = /* GraphQL */ `
  query MySubscription($projectId: Int!) {
    asyncnewui_project_chats(where: { projectId: { _eq: $projectId } }) {
      created_at
      id
      userId
      updated_at
      projectId
      message
    }
  }
`;
