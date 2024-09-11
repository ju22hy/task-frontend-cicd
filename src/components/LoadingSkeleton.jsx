import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className="flex w-1/3 h-[25vh] p-[0.25rem] flex-col justify-between">
      <div className="w-full h-full border border-gray-500 bg-neutral-900 rounded-md flex flex-col justify-between py-3 px-4">
        <div>
          <Skeleton width="40%" height="40px" className="mb-4" />
        </div>
        <div>
          <div>
            <Skeleton width="100%" height="80px" className="mb-4" />
            <Skeleton width="100%" height="20px" className="mb-2" />
          </div>
          <div className="flex justify-between gap-x-4">
            <Skeleton width="100%" height="20px" className="mb-2" />
            <Skeleton width="100%" height="20px" className="mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
