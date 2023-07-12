import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useFormModal from "@/hooks/useFormModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";

import Avatar from "../Avatar";
import Modal from "../Modal";

const FormModal = () => {
  const formModal = useFormModal();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/posts", { body });

      toast.success("Tweet created");

      setBody("");
      mutatePosts();
      formModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [formModal, body]);

  const bodyContent = (
    <div className="px-5">
      <div className="flex flex-row gap-4">
        <div>
          <Avatar userId={currentUser?.id} />
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="
            disabled: opacity-80
            peer
            resize-none
            mt-3
            w-full
            h-60
            bg-black
            ring-0
            outline-none
            text-[22px]
            placeholder-neutral-500
            text-white
            "
            placeholder="What's happening?"
          ></textarea>
          <hr
            className="
            opacity-0
            peer-focus:opacity-100
            h-[1px]
            w-full
            border-neutral-800
            transition
          "
          />
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={formModal.isOpen}
      onClose={formModal.onClose}
      onSubmit={onSubmit}
      actionLabel="Tweet"
      title="Post new Tweet"
      body={bodyContent}
    />
  );
};

export default FormModal;
