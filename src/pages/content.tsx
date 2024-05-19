import {
  ArrowLongRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Footer from "../components/footer";
import Header from "../components/header";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";
import { TweetEmbed, TweetEmbed2, TwitterCard } from "@/components/TwitterCard";
import { TarifasCard } from "@/components/Tarifas";
const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Running out of content
      </div>
    ),
  },
];
function Content() {
  return (
    <div
      className="flex h-full w-full flex-col
  bg-gray-800 "
    >
      <Header />
      <div className="my-24 flex w-full flex-col text-white ">
        <div className="font-inter mx-auto my-2 max-w-[900px] text-center text-8xl text-[80px] font-bold leading-[3.8rem] sm:leading-none">
          Find new clients for your digital agency
        </div>
        <span className="mx-auto my-2 max-w-[950px] text-center font-['Open_Sans'] text-2xl">
          1,000+ handpicked recently funded startups that just raised millions
          and are looking to outsource your services. In your inbox. Every
          month.
        </span>
        <div className="mx-auto flex flex-auto flex-col font-bold lg:flex-row">
          <button className="mx-2 my-2 rounded-md border bg-white p-2 font-sans text-lg text-gray-800">
            Send me leads every month
          </button>
          <button className="mx-2 flex w-auto rounded-md border p-2 font-sans text-lg">
            <span>Show me a live demo</span>
            <ArrowRightIcon className="mx-2 my-auto size-6" />
          </button>
        </div>
        <div className="mx-auto mt-8 flex flex-col px-4 font-['Open_Sans'] sm:px-8 md:flex-row ">
          <div className="w-sm:80  my-6 flex md:flex-col md:pr-4">
            <div
              className="icon medium ml-4 mr-8 md:mb-4 md:ml-0"
              style={{ height: "32px", width: "32px" }}
            >
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="rgb(255, 255, 255)"
                height="32"
                width="32"
                viewBox="0 0 512 512"
              >
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v137.7l63.5 46.2c5.4 3.9 6.5 11.4 2.6 16.8l-28.2 38.8c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="xs:my-2 text-xl sm:my-2">
                Sign up in
                <span className="ml-1 underline decoration-[#39ba93] decoration-2 underline-offset-2">
                  10 seconds
                </span>
              </span>
              <span className="my-2 md:max-w-60">
                All you have to do is click the subscribe button and enter your
                email. That's it.
              </span>
            </div>
          </div>
          <div w-full className="w-sm:80 my-6  flex md:flex-col md:px-6">
            <div
              className="icon medium ml-4 mr-8 md:mb-4 md:ml-0"
              style={{ height: "32px", width: "32px" }}
            >
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="rgb(255, 255, 255)"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:my-2">
                Receive leads
                <span className="ml-1 underline decoration-[#39ba93] decoration-2 underline-offset-2">
                  instantly
                </span>
              </span>
              <span className="my-2 md:max-w-60">
                Receive the previous month's list upon sign up. And a new list
                every month.
              </span>
            </div>
          </div>
          <div w-full className="w-sm:80  my-6 flex md:flex-col md:pl-4">
            <div
              className="icon medium ml-4 mr-8 md:mb-4 md:ml-0"
              style={{ height: "32px", width: "32px" }}
            >
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="rgb(255, 255, 255)"
                height="32"
                width="32"
                viewBox="0 0 512 512"
              >
                <path d="M505.1 19.1C503.8 13 499 8.2 492.9 6.9 460.7 0 435.5 0 410.4 0 307.2 0 245.3 55.2 199.1 128H94.9c-18.2 0-34.8 10.3-42.9 26.5L2.6 253.3c-8 16 3.6 34.7 21.5 34.7h95.1c-5.9 12.8-11.9 25.5-18 37.7-3.1 6.2-1.9 13.6 3 18.5l63.6 63.6c4.9 4.9 12.3 6.1 18.5 3 12.2-6.1 24.9-12 37.7-17.9V488c0 17.8 18.8 29.4 34.7 21.5l98.7-49.4c16.3-8.1 26.5-24.8 26.5-42.9V312.8c72.6-46.3 128-108.4 128-211.1.1-25.2.1-50.4-6.8-82.6zM400 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl  sm:my-2">
                Start reaching out
                <span className="ml-1 underline decoration-[#39ba93] decoration-2 underline-offset-2">
                  today
                </span>
              </span>
              <span className="my-2 md:max-w-60">
                Now that you have your leads, you can start reaching out and
                closing deals.
              </span>
            </div>
          </div>
        </div>
        <div className="xs:px-8 flex flex-col px-4">
          <div className="font-inter mx-auto my-2 max-w-[900px] text-center text-[3.8rem] font-bold leading-[3.6rem] sm:leading-none">
            Build your acquisition channel
          </div>
          <p className="xs:mb-[50px] mx-auto  max-w-[950px] text-center font-['Open_Sans'] text-xl">
            Build your own, independent acquisition channel and scale at your
            pace
          </p>
          <div className="xs:flex-row mx-auto my-[70px] flex w-full max-w-[900px] flex-col items-center justify-between ">
            <div className="xs:text-left xs:mr-8 xs:max-w-[330px]  mx-auto text-center">
              <div className="font-inter xs:max-w-[900px] mx-auto my-2 flex-col  text-4xl  leading-none sm:leading-none">
                <h3 className="mb-2">
                  Find newly funded startups that
                  <span className="ml-1 underline decoration-[#39ba93] underline-offset-2">
                    just raised millions
                  </span>
                </h3>
              </div>
              <p className="text-l w-full font-['Open_Sans']">
                From startups, to nonprofit organizations, to enterprises. These
                companies have big needs and even bigger budgets.
              </p>
            </div>
            <div className=" mx-auto pt-[40px] ">
              <img src="./src/assets/image2.png" />
            </div>
          </div>
          <div className="xs:flex-row mx-auto my-[45px] flex w-full max-w-[900px] flex-col items-center justify-between ">
            <div className="xs:text-left xs:max-w-[350px] xs:mr-[50px] xs:order-2 mx-auto text-center">
              <div className=" xs:leading-none mx-auto my-2  max-w-[900px] flex-col text-4xl leading-none">
                <h3 className="mb-2">
                  That are
                  <span className="ml-1 underline decoration-[#39ba93] underline-offset-2">
                    handpicked for your agency
                  </span>
                </h3>
              </div>
              <p className="text-l w-full font-['Open_Sans']">
                No, you won't find Jeff Bezos and Amazon. You'll find companies
                that are easy to reach out to and build relationships with.
              </p>
            </div>
            <div className=" xs:w-[700px] mx-auto pt-[40px] ">
              <img src="./src/assets/cercle2.png" />
            </div>
          </div>
          <div className="xs:flex-row mx-auto my-[45px] flex w-full max-w-[900px] flex-col items-center justify-between">
            <div className="xs:text-left xs:max-w-[350px] xs:mr-[50px] mx-auto  flex flex-col text-center">
              <div className="xs:leading-none mx-auto my-2 max-w-[900px] flex-col  font-['Opens_sans']  text-4xl leading-none">
                <h3 className="mb-2">
                  That are
                  <span className="ml-1 underline decoration-[#39ba93] underline-offset-2">
                    looking to outsource your services
                  </span>
                </h3>
              </div>
              <p className="text-l w-full font-['Open_Sans']">
                There are clear signals that these companies are lacking or
                investing in certain domains. This is where you fit in.
              </p>
            </div>
            <div className=" xs:max-w-[700px] mx-auto pt-[40px] ">
              <img src="./src/assets/lines2.png" />
            </div>
          </div>
          <div className="xs:flex-row mx-auto my-[45px] flex w-full max-w-[900px] flex-col items-center justify-between ">
            <div className="xs:text-left xs:max-w-[350px] xs:ml-[50px] xs:order-2 mx-auto flex flex-col text-center">
              <div className="xs:leading-none mx-auto my-2 max-w-[900px] flex-col  font-['Opens_sans']  text-4xl leading-none">
                <h3 className="mb-2">
                  And
                  <span className="ml-1 mr-1 underline decoration-[#39ba93] underline-offset-2">
                    reach out to the key decision maker
                  </span>
                  with ease
                </h3>
              </div>
              <p className="text-l w-full font-['Open_Sans']">
                I manually collect and verify every single data point. You can
                expect verified email addresses when publicly available.
              </p>
            </div>
            <div className=" xs:max-w-[700px] mx-auto pt-[40px] ">
              <img src="./src/assets/diagram2.png" />
            </div>
          </div>
        </div>
        <div className="mx-auto flex flex-col items-center justify-between px-4 lg:flex-row">
          <div className="w-full lg:mx-4 lg:w-[400px]">
            <TweetEmbed url={"htppasd"} />
          </div>
          <div className="w-full lg:mx-4 lg:w-[400px]">
            <TweetEmbed2 url={"asdfasf"} />
          </div>
        </div>
        <div id="pricing" className="pt-[120px]">
          <div className="xs:text-left xs:max-w-[350px] xs:ml-[50px] xs:order-2 mx-auto flex flex-col text-center">
            <div className="xs:leading-none mx-auto my-2 flex max-w-[900px] flex-col  text-6xl  font-bold leading-none">
              <h3 className="mb-2">
                Make your
                <span className="ml-2 mr-1 underline decoration-[#39ba93] decoration-4 underline-offset-2">
                  money back, forever
                </span>
              </h3>
            </div>
            <p className="mb-12 w-full font-['Open_Sans'] text-xl">
              Even a tiny deal with a recently funded startup will make your
              money back for years
            </p>
          </div>
          <div className="lg:max-w-70 lg:max-y-[70px] mx-auto flex flex-col items-center justify-center lg:flex-row">
            <TarifasCard />
          </div>
        </div>
      </div>

      {/* <StickyScroll content={content} /> */}
      <Footer />
    </div>
  );
}

export default Content;
