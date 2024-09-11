import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  fetchDeleteItemData,
  fetchGetItemsData,
  fetchUpdateCompletedData,
} from "../redux/slices/apiSlice";
import { openModal } from "../redux/slices/modalSlice";

import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";

import { toast } from "react-toastify";

const Item = ({ task }) => {
  const { _id, title, description, date, iscompleted, isimportant, userid } =
    task;
  // console.log(userid);
  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(iscompleted);
  // console.log(isCompleted);

  // useEffect 사용으로 `iscompleted` prop이 변경될 때 상태를 업데이트
  useEffect(() => {
    setIsCompleted(iscompleted);
  }, [iscompleted]);

  const deleteItem = async () => {
    const confirm = window.confirm("아이템을 삭제하시겠습니까?");
    if (!confirm) return;
    if (!_id) {
      toast.error("잘못된 사용자 접근 입니다.");
      return;
    }

    try {
      await dispatch(fetchDeleteItemData(_id)).unwrap();
      toast.success("아이템이 삭제되었습니다.");
      await dispatch(fetchGetItemsData(userid)).unwrap();
    } catch (error) {
      toast.error("아이템 삭제에 실패했습니다.");
      console.error(error);
    }
  };

  const changeCompleted = async () => {
    // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
    // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.

    // 상태를 미리 업데이트 하여 반영된 값을 전달
    const newIsCompleted = !isCompleted;
    setIsCompleted(newIsCompleted);

    const updateCompletedData = {
      itemId: _id,
      isCompleted: newIsCompleted,
    };

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCompletedData),
    };

    try {
      await dispatch(fetchUpdateCompletedData(options)).unwrap();
      // 성공 메시지를 보여줍니다.
      newIsCompleted
        ? toast.success("일정을 완료했습니다.")
        : toast.success("일정이 완료되지 않았습니다.");
      // 최신 데이터를 가져와 UI를 갱신합니다.
      await dispatch(fetchGetItemsData(userid)).unwrap();
    } catch (error) {
      // 오류 발생 시 메시지를 보여줍니다.
      toast.error("상태 변경에 실패했습니다.");
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: "update", task }));
  };

  const handleViewModal = () => {
    dispatch(openModal({ modalType: "view", task }));
  };

  return (
    <div className="item w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 bg-neutral-900 rounded-md flex flex-col justify-between py-3 px-4">
        <div className="upper">
          <h2 className="text-2xl font-semibold mb-4 relative pb-2 flex justify-between">
            <span className="w-full h-[1px] bg-gray-500 absolute bottom-0"></span>
            {title}
            <span
              className="text-sm font-light py-1 px-3 border border-gray-500 rounded-md hover:bg-neutral-700 cursor-pointer"
              onClick={handleViewModal}
            >
              View
            </span>
          </h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{description}</p>
        </div>
        <div className="lower">
          <p className="text-xs mb-1">{date}</p>
          <div className="item-footer flex justify-between items-center">
            <div className="item-footer-left flex gap-x-2 cursor-pointer">
              {iscompleted ? (
                <button
                  className="block py-1 px-3 bg-green-600 text-xs font-medium text-white rounded-md"
                  onClick={changeCompleted}
                >
                  Completed
                </button>
              ) : (
                <button
                  className="block py-1 px-3 bg-neutral-600 text-xs font-medium text-white rounded-md"
                  onClick={changeCompleted}
                >
                  Uncompleted
                </button>
              )}

              {isimportant && (
                <button className="block py-1 px-4 bg-amber-500 text-sm text-white rounded-md">
                  Important
                </button>
              )}
            </div>
            <div className="item-footer-right flex gap-x-4 items-center cursor-pointer">
              <button onClick={handleOpenModal}>
                <FaRegPenToSquare className="w-5 h-5" />
              </button>
              <button className="delete" onClick={deleteItem}>
                <FaRegTrashCan className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
