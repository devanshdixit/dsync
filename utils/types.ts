import { MouseEventHandler } from "react";

export type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: "waiting" | "success";
  /** an object with known properties (but could have more at runtime) */
  obj: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** any non-primitive value - can't access any properties (NOT COMMON but useful as placeholder) */
  obj2: object;
  /** an interface with no required properties - (NOT COMMON, except for things like `React.Component<{}, State>`) */
  obj3: {};
  /** a dict object with any number of properties of the same type */
  // dict1: {
  //   [key: string]: MyTypeHere;
  // };
  //dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** function that doesn't take or return anything (VERY COMMON) */
  //onClick: () => void;
  /** function with named prop (VERY COMMON) */
  //onChange: (id: number) => void;
  /** function type syntax that takes an event (VERY COMMON) */
  //onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** an optional prop (VERY COMMON!) */
  //optional?: OptionalType;
  /** when passing down the state setter function returned by `useState` to a child component. `number` is an example, swap out with whatever the type of your state */
  setState: React.Dispatch<React.SetStateAction<number>>;
};

export declare interface ButtonProps {
  title: any;
  className: string;
  onClick?: any;
  icon?: any;
  onSubmit?: any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
}

export declare interface Input {
  title?: string;
  placeholder: string;
  type?: string;
  className: string;
  required?: boolean;
  onChange?: any;
  labelClass?: string;
  icon?: any;
  onBlur?: any;
  onSubmit?: any;
  value?: string;
  name?: string;
  onkeyDown?: any;
}
export declare interface User {
  walletAddress: string;
  provider: string;
}

export interface SubmissionDetailsProps {
  submission: any;
  handleReject: MouseEventHandler<HTMLButtonElement>;
  handleAccept: MouseEventHandler<HTMLButtonElement>;
  buttonLoadingReject: boolean;
  buttonLoading: boolean;
  isManager?: boolean;
  project?:any
}


export declare interface Project {
  id?: string;
  name: string;
  logo?: string;
  category?: string;
  createdBy?: string;
  chats?: any;
  updated_at?:any
  created_at?:any
}
export declare interface Error {
  error: any;
  type: string;
}
export declare interface InfoWarning {
  error: any;
}

export declare interface TaskCardProps {
  id?: string;
  tag?: string;
  projectId: string;
  createdBy?: string;
  title: string;
  eta?: string;
  status: TaskStatus;
  amount?: string;
  attachment: any[];
  description?: string;
  assignedTo?: string;
  taskDoneTime?: string;
  startedBy?: any;
  submissions?: any;
  activity?: any;
  link?: string;
  taskhash?: string;
  claimedHash?: string;
  transactionHash?: string;
}
export declare interface TaskCreateProps {
  projectId: string;
  title: string;
  eta?: string;
  status: TaskStatus; 
}
export declare interface KanbanCardSectionProps {
  title: TaskStatus;
  className?: string;
  query: any;
  statusColor: string;
  projectDetails?: Project;
  isManager?:boolean;
}

export declare interface IsError {
  isError: boolean;
  message?: string;
}

export type TaskStatus = "All" | "Staked" | "Draft" | "Live" | "Done";
export type SubmissionsStatus = "submitted" | "accepted" | "rejected";

export type Token = {
  tokenAddress: string;
  tokenDecimals: number;
  tokenName: string;
  tokenNetwork: string;
  tokenSymbol: string;
};
