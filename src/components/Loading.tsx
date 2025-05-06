import "@/app/loading.css";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center text-white w-full h-screen bg-black backdrop-opacity-65 z-30">
      <div>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
      <p className="text-[1.172rem] mt-4">Loading</p>
    </div>
  );
}
