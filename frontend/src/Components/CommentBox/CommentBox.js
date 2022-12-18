import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import "./style.css";



const INITIAL_HEIGHT = 20;
export default function CommentBox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const useDynamicHeightField = (element, value) => {
    useEffect(() => {
      if (!element) return;
      element.current.style.height = "auto";
      element.current.style.height = element.current.scrollHeight + "px";
    }, [element, value]);
  };
  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  useDynamicHeightField(textRef, commentValue);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };
  const onChange = (e) => {
    setCommentValue(e.target.value);
  };
  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("send the form data somewhere");
  };
  return (
    <div className="container_container">
      <form
        onSubmit={onSubmit}
        ref={containerRef}
        className={cn("comment-box", {
          expanded: isExpanded,
          collapsed: !isExpanded,
          modified: commentValue.length > 0
        })}
        style={{
          minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
        }}
      >
       <div className="text_area">  <label htmlFor="comment">What are your thoughts?</label>
        <textarea
          ref={textRef}
          onClick={onExpand}
          onFocus={onExpand}
          onChange={onChange}
          className="comment-field"
          placeholder="What are your thoughts?"
          value={commentValue}
          name="comment"
          id="comment"
        /></div>
        <div className="actions">
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={commentValue.length < 1}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
