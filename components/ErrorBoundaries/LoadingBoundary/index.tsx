import React from "react";

const LoadingBoundary = ({
  id,
  project,
}: {
  id: string | string[] | undefined;
  project: string | string[] | undefined;
}) => {
  return (
    <>
      <h1 className="text-white text-2xl text-center my-8">Loading...</h1>
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

export default LoadingBoundary;
