import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserXmark, faListUl, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddFriendModal from "./modals/AddFriendModal";
import RemoveFriendModal from "./modals/RemoveFriendModal";
import { useEffect, useRef } from "react";

export default function ProjectNavbar({project}) {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isRemoveFriendOpen, setIsRemoveFriendOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOpenAddFriendModal = () => {
    setIsAddFriendOpen(true);
  };

  const handleCloseAddFriendModal = () => {
    setIsAddFriendOpen(false);
  };

  const handleOpenRemoveFriendModal = () => {
    setIsRemoveFriendOpen(true);
  };

  const handleCloseRemoveFriendModal = () => {
    setIsRemoveFriendOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <section className="shadow-md p-4 font-semibold rounded-[20px] w-full border-2 border-gray-300 gap-4 flex items-center">
      <div className="float-left">
        <Link href="/dashboard">
          <span className="text-3xl">{project?.title ?? 'Task'}</span>
        </Link>
      </div>
      <ul className="font-extralight ml-auto flex gap-5 xl:gap-6 text-[#5F5858]">
        <li className="hidden lg:block cursor-pointer hover:text-blue-500">
          <button type="button" onClick={handleOpenAddFriendModal}>
            <FontAwesomeIcon icon={faUserPlus} />
            <span className="ml-2">Add Friend</span>
          </button>
          <AddFriendModal isOpen={isAddFriendOpen} onClose={handleCloseAddFriendModal} projectId={project?.projectId}/>
        </li>
        <li className="hidden lg:block cursor-pointer hover:text-blue-500">
          <button type="button" onClick={handleOpenRemoveFriendModal}>
            <FontAwesomeIcon icon={faUserXmark} />
            <span className="ml-2">Remove Friend</span>
          </button>
          <RemoveFriendModal isOpen={isRemoveFriendOpen} onClose={handleCloseRemoveFriendModal} projectContributor={project?.projectContributor}/>
        </li>
        <li className="hidden lg:block cursor-pointer hover:text-blue-500">
          <FontAwesomeIcon icon={faListUl} />
          <span className="ml-2">Add another list</span>
        </li>
        <li className="lg:hidden cursor-pointer text-[18px]" onClick={handleToggleDropdown} ref={dropdownRef}>
          <FontAwesomeIcon icon={faBars} className="text-[22px] xs:text-[16px]"/>
          <span className="ml-2 hidden xs:inline">Menu</span>
        </li>
      </ul>
      {isDropdownOpen && (
        <ul className="lg:hidden absolute mt-12 right-5 rounded-[20px] shadow-md font-extralight text-[#5F5858] bg-neutral p-5" ref={dropdownRef}>
          <li className="block cursor-pointer hover:text-blue-500">
            <button type="button" onClick={handleOpenAddFriendModal}>
              <FontAwesomeIcon icon={faUserPlus} />
              <span className="ml-2">Add Friend</span>
            </button>
          </li>
          <li className="block cursor-pointer hover:text-blue-500">
            <button type="button" onClick={handleOpenRemoveFriendModal}>
              <FontAwesomeIcon icon={faUserXmark} />
              <span className="ml-2">Remove Friend</span>
            </button>
          </li>
          <li className="block cursor-pointer hover:text-blue-500">
            <FontAwesomeIcon icon={faListUl} />
            <span className="ml-2">Add another list</span>
          </li>
        </ul>
      )}
    </section>
  );
}
