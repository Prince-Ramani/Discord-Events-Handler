import { CustomButton } from "@/components/CustomButton";

const NotFound = () => {
  return (
    <div className="h-full w-full bg-black bg-[url('https://res.cloudinary.com/dwxzguawt/image/upload/v1732018162/jeremy-thomas-4dpAqfTbvKA-unsplash_a9alib.jpg')] bg-cover  bg-no-repeat flex flex-col items-center justify-center text-white">
      <div className="flex gap-4 text-2xl sm:text-3xl md:text-4xl md:gap-6 p-4 font-semibold">
        <div>404 </div>
        <div className="border border-white " />
        <div>Not Found</div>
      </div>
      <div className=" max-w-[35ch] md:max-w-prose flex flex-col items-center gap-4 mt-2 sm:mt-10">
        <div className="font-semibold text-start text-xl">
          {" "}
          Oops! We couldn't find that page.
        </div>
        <div className="text-sm leading-wide">
          It looks like the content you're looking for doesn't exist or has been
          moved. Please double-check the URL, or try searching for something
          else. If you need help, feel free to reach out to us.
        </div>

        <CustomButton
          className="sm:text-lg  p-1 px-5 sm:px-7 md:px-14 bg-blue-500"
          href="/"
        >
          Home
        </CustomButton>
      </div>
    </div>
  );
};

export default NotFound;
