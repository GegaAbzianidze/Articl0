import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { supabase } from "../SupabaseClient";

const Editor = ({ user }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textareaRef = useRef(null);
  const contextMenuRef = useRef(null);
  const longPressTimeout = useRef(null);
  const [Title, setTitle] = useState("");

  const handleContextMenu = (e) => {
    e.preventDefault();
    const selected = window.getSelection().toString();
    if (selected) {
      setSelectedText(selected);
      setMousePosition({ x: e.clientX, y: e.clientY });
      setShowContextMenu(true);
    } else {
      setShowContextMenu(false);
    }
  };

  const handleTouchStart = (e) => {
    longPressTimeout.current = setTimeout(() => {
      handleContextMenu(e);
    }, 500); // Adjust the delay as needed for a long press
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimeout.current);
  };

  const handleFormat = (format) => {
    const textArea = textareaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selected = selectedText;

    let newText = "";
    if (format === "bold") {
      newText = `${textArea.value.slice(
        0,
        start
      )}**${selected}**${textArea.value.slice(end)}`;
    } else if (format === "italic") {
      newText = `${textArea.value.slice(
        0,
        start
      )}_${selected}_${textArea.value.slice(end)}`;
    } else if (format === "underline") {
      newText = `${textArea.value.slice(
        0,
        start
      )}<ins>${selected}</ins>${textArea.value.slice(end)}`;
    } else if (format === "strikethrough") {
      newText = `${textArea.value.slice(
        0,
        start
      )}~~${selected}~~${textArea.value.slice(end)}`;
    } else if (format === "code") {
      newText = `${textArea.value.slice(
        0,
        start
      )}\`\`\`${selected}\`\`\`${textArea.value.slice(end)}`;
    }

    textArea.value = newText;
    setShowContextMenu(false);
  };

  const handleDone = async (e) => {
    const textArea = textareaRef.current;
    const content = textArea.value;
    const paragraphs = content.split("\n\n");

    const formattedText = paragraphs
      .map((paragraph) => paragraph.replace(/\n/g, "<br/><br/>"))
      .join("<br/><br/>");
    console.log(formattedText);

    // Send 'formattedText' to the server using your preferred method (e.g., API call)
    e.preventDefault();
    if (user) {
      const Author = user.user_metadata.full_name;
      const Mail = user.email;
      const Article = formattedText;

      const { data, error } = await supabase
        .from("Articl0")
        .insert([{ Title, Author, Article, Mail }]);

      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    } else {
      alert("You need to be signed in to publish an article");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !textareaRef.current.contains(e.target) &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-full h-[600px] px-12 md:px-64 lg:px-80 relative">
      <input
        type="text"
        className="w-full h-10 border-0 focus:outline-none focus:ring-0 p-3"
        placeholder="Title"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        ref={textareaRef}
        className="w-full h-full resize-none border-0 focus:outline-none focus:ring-0 p-3"
        placeholder="Write your story..."
        autoFocus
        autoSave="true"
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchEnd}
      ></textarea>
      {showContextMenu && (
        <div
          ref={contextMenuRef}
          className="absolute"
          style={{
            top: mousePosition.y,
            left: mousePosition.x,
            zIndex: 1000,
            backgroundColor: "white",
            fontSize: "20px",
            border: "1px solid gray",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "5px",
            borderRadius: "4px",
          }}
        >
          <button
            className="p-1"
            onClick={(e) => {
              e.stopPropagation();
              handleFormat("bold");
            }}
          >
            <Icon icon="material-symbols:format-bold" />
          </button>
          <button
            className="p-1"
            onClick={(e) => {
              e.stopPropagation();
              handleFormat("italic");
            }}
          >
            <Icon icon="material-symbols:format-italic" />
          </button>
          <button
            className="p-1"
            onClick={(e) => {
              e.stopPropagation();
              handleFormat("underline");
            }}
          >
            <Icon icon="material-symbols:format-underlined" />
          </button>
          <button
            className="p-1"
            onClick={(e) => {
              e.stopPropagation();
              handleFormat("strikethrough");
            }}
          >
            <Icon icon="material-symbols:format-strikethrough" />
          </button>
          <button
            className="p-1"
            onClick={(e) => {
              e.stopPropagation();
              handleFormat("code");
            }}
          >
            <Icon icon="material-symbols:code" />
          </button>
        </div>
      )}
      <button
        className="btn btn-neutral fixed top-2 right-2"
        onClick={handleDone}
      >
        Publish
      </button>
    </div>
  );
};

export default Editor;

Editor.propTypes = {
  user: PropTypes.object,
};
