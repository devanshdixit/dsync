import { Modal, notification } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const SharePopUP = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  //const [copyText, setCopyText] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
    console.log("true");
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  // const handleCopyText = (e: any) => {
  //   setCopyText(e.target.value);
  // };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    notification.info({ message: "Copied to clipboard" });
  };
  useEffect(() => {
    setUrl(window.location.href);
  });
  return (
    <>
      <div
        className="rounded-full w-[30px] h-[30px] gray-bg flex items-center justify-center"
        onClick={showModal}
      >
        <Image src={"/icons/share.svg"} width={15} height={18} alt="bell" />
      </div>
      <Modal
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        className="stake-modal max-w-max p-10"
        footer={false}
      >
        <div className="pt-5">
          <h1 className="font-[400] text-[20px] text-center mb-2">
            Share this Task
          </h1>
          <p className="font-[400] text-[16px] text-center mb-2">
            If you like this task share it with your friends.
          </p>
        </div>
        <div className="flex gap-5 justify-center">
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={40} className="rounded-full" />
          </LinkedinShareButton>

          <TwitterShareButton url={url}>
            <TwitterIcon size={40} className="rounded-full" />
          </TwitterShareButton>

          <RedditShareButton url={url}>
            <RedditIcon size={40} className="rounded-full" />
          </RedditShareButton>

          <FacebookShareButton url={url} quote={`share this on facebook`}>
            <FacebookIcon size={40} className="rounded-full" />
          </FacebookShareButton>
        </div>
        <div className="mt-3 pb-5 px-5">
          <div className="flex gap-2 justify-center items-center">
            <p className="border-[1px] border-[#3D3D3D] border-opacity-50 p-2">
              {url}
            </p>
            <div>
              <Image
                src="/images/CopyLink.svg"
                height={15}
                width={15}
                alt="Icon"
                onClick={copyToClipboard}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SharePopUP;
