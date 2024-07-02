import React from "react";

const FetchErrorBoundary = ({
  id,
  project,
  isError,
}: {
  id: string | string[] | undefined;
  project: string | string[] | undefined;
  isError: {
    isError: boolean;
    message?: string;
  };
}) => {
  return (
    <>
      <h1 className="text-red-400 text-2xl text-center my-8">
        {isError.message}
      </h1>
      <button
        onClick={(e: any) => {
          e.preventDefault();
          location.reload();
        }}
        className="text-white flex justify-center mx-auto border-2 border-red-400 px-4 py-1 rounded-md"
      >
        Retry
      </button>
    </>
  );
};

export default FetchErrorBoundary;
