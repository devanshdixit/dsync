import { notification } from "antd";
import { FC, useEffect, useState } from "react";
import { BsShareFill, BsTwitter } from "react-icons/bs";
import { FaRedditAlien, FaTelegramPlane } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
import { IoLinkSharp } from "react-icons/io5";
import {
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import Button from "../Forms/Button";

interface popup {
  home?: boolean;
  isSmall?: false | boolean;
  project?: any;
  category?: string;
  name?: any;
}
const Share: FC<popup> = ({ isSmall, project, category, name, home }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  });

  return (
    <div>
      <div className="dropdown text-white  dropdown-end ">
        <label tabIndex={0}>
          {isSmall ? (
            <div className="underline text-[12px] text-[#CECECE] underline-offset-2 cursor-pointer">
              More
            </div>
          ) : (
            <>
              <BsShareFill className="md:hidden block" />
              <Button
                title={"Share"}
                icon={<BsShareFill />}
                className="hidden md:flex justify-center items-center flex-row-reverse gap-[10px] border-[1px] border-white px-[16px] py-[8px]  font-[600] text-[14px] hover:bg-[#242426]"
              />
            </>
          )}
        </label>
        {home ? (
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-[#0C0C0E] p-2 z-50"
          >
            {!isSmall && (
              <li className="border-b-[1px] border-[#3D3D3D]  ">
                <div className="text-[12px] text-[#858585] font-[400] leading-6 font-Inter pr-[120px] md:pr-[173px] py-2">
                  Share
                </div>
              </li>
            )}

            {!isSmall && (
              <TwitterShareButton url={`${url}${category}/${name}`}>
                <li className="flex gap-[17px]">
                  <div
                    className={`text-[12px] font-[400] leading-6 font-Inter ${
                      isSmall ? "w-[188px]" : "w-[200px]md:w-[280px]"
                    }  py-2 hover:bg-[#242426]`}
                  >
                    <BsTwitter className="w-5 h-5 object-contain" /> Share on
                    Twitter
                  </div>
                </li>
              </TwitterShareButton>
            )}
            <LinkedinShareButton url={`${url}${category}/${name}`}>
              <li className="flex gap-[17px]">
                <div
                  className={`text-[12px] font-[400] leading-6 font-Inter ${
                    isSmall ? "w-[208px]" : "w-[280px]"
                  }  py-2 hover:bg-[#242426]`}
                >
                  <GrLinkedinOption className="w-5 h-5 object-contain" />
                  Share on LinkedIn
                </div>
              </li>
            </LinkedinShareButton>
            <RedditShareButton
              title={`${url}${category}/${name}`}
              url={`${url}${category}/${name}`}
            >
              <li className="flex gap-[17px]">
                <div
                  className={`text-[12px] font-[400] leading-6 font-Inter ${
                    isSmall ? "w-[188px]" : "w-[200px]md:w-[280px]"
                  }  py-2 hover:bg-[#242426]`}
                >
                  <FaRedditAlien className="w-5 h-5 object-contain" />
                  Share on Redit
                </div>
              </li>
            </RedditShareButton>
            <TelegramShareButton url={`${url}${category}/${name}`}>
              <li className="flex gap-[17px]">
                <div
                  className={`text-[10px] font-[400] leading-6 font-Inter ${
                    isSmall ? "w-[188px]" : "w-[200px]md:w-[280px]"
                  }  py-2 hover:bg-[#242426]`}
                >
                  <FaTelegramPlane className="w-5 h-5 object-contain" />
                  Share on Telegram
                </div>
              </li>
            </TelegramShareButton>

            <li
              className="flex gap-[17px]"
              onClick={() => {
                navigator.clipboard?.writeText(`${url}${category}/${name}`);
                notification.info({ message: "Copied to clipboard" });
              }}
            >
              <div
                className={`text-[12px] font-[400] leading-6 font-Inter ${
                  isSmall ? "w-[188px]" : "w-[200px]md:w-[280px]"
                }  py-2 hover:bg-[#242426]`}
              >
                <IoLinkSharp className="w-5 h-5 object-contain" /> Copy link
              </div>
            </li>
          </ul>
        ) : (
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-[#0C0C0E] p-2 z-50"
          >
            {!isSmall && (
              <li className="border-b-[1px] border-[#3D3D3D]  ">
                <div className="text-[12px] text-[#858585] font-[400] leading-6 font-Inter pr-[120px] md:pr-[173px] py-2">
                  Share
                </div>
              </li>
            )}

            {!isSmall && (
              <TwitterShareButton url={`${url}`}>
                <li className="flex gap-[17px]">
                  <div
                    className={`text-[12px] font-[400] leading-6 font-Inter ${
                      isSmall ? "w-[188px]" : "w-[200px]md:w-[280px]"
                    }  py-2 hover:bg-[#242426]`}
                  >
                    <BsTwitter className="w-5 h-5 object-contain" /> Share on
                    Twitter
                  </div>
                </li>
              </TwitterShareButton>
            )}
            <LinkedinShareButton url={`${url}`}>
              <li className="flex gap-[17px]">
                <div
                  className={`text-[12px] font-[400] leading-6 font-Inter ${
                    isSmall ? "w-[188px]" : "w-[200px]md:w-[280px]"
                  }  py-2 hover:bg-[#242426]`}
                >
                  <GrLinkedinOption className="w-5 h-5 object-contain" />
                  Share on LinkedIn
                </div>
              </li>
            </LinkedinShareButton>
            <RedditShareButton title={`${url}`} url={`${url}`}>
              <li className="flex gap-[17px]">
                <div
                  className={`text-[12px] font-[400] leading-6 font-Inter ${
                    isSmall ? "w-[188px]" : "w-[200px]md:w-[280px]"
                  }  py-2 hover:bg-[#242426]`}
                >
                  <FaRedditAlien className="w-5 h-5 object-contain" />
                  Share on Redit
                </div>
              </li>
            </RedditShareButton>
            <TelegramShareButton url={`${url}`}>
              <li className="flex gap-[17px]">
                <div
                  className={`text-[12px] font-[400] leading-6 font-Inter ${
                    isSmall ? "w-[188px]" : "w-[200px]md:w-[280px]"
                  }  py-2 hover:bg-[#242426]`}
                >
                  <FaTelegramPlane className="w-5 h-5 object-contain" />
                  Share on Telegram
                </div>
              </li>
            </TelegramShareButton>

            <li
              className="flex gap-[17px]"
              onClick={() => {
                navigator.clipboard?.writeText(`${url}`);
                notification.info({ message: "Copied to clipboard" });
              }}
            >
              <div
                className={`text-[12px] font-[400] leading-6 font-Inter ${
                  isSmall ? "w-[188px]" : "w-[200px]md:w-[280px]"
                }  py-2 hover:bg-[#242426]`}
              >
                <IoLinkSharp className="w-5 h-5 object-contain" /> Copy link
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Share;
