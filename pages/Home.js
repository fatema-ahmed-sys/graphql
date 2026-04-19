import { LoadNav } from "../funcs/navbar";
import { State } from "../funcs/state";
// import { OrgIndexPosts } from "../funcs/posts";

export const Home = async () => {
  const base = import.meta.env.BASE_URL;
  if (!State.isLoggedIn()) {
    window.location.assign(`${base}login`);
    return;
  }

  const app = document.getElementById("app");
  const username = State.user.nickname;
  const avatar = State.user.avatar;

  app.innerHTML = `
    ${LoadNav()}
    <div class="lower-div">
      <main>
        <div id="c-post-modal" class="modal">
          <div class="modal-content">
            <div id="c-post-userinfo">
              <div id="c-post-pfp">
                <img src="${avatar}">
              </div>
              <p id="c-post-nickname">${username}</p>
            </div>
            <textarea id="c-post-textArea" placeholder="What's on your mind?"></textarea>
            <div id="c-post-options">
              <div class="c-post-option">
                <i class="fa fa-image" id="c-img-upload-trigger" title="Upload Image"></i>
                <input type="file" id="img-upload" style="display: none">
              </div>
              <div class="c-post-option">
                <i class="fa fa-hashtag" id="cat-choose-Btn" title="Choose Category"></i>
              </div>
            </div>
            <div id="c-post-cats" style="display: none">
              <select id="c-post-cat-select">
                <option value="1">General</option>
                <option value="2">Engineering</option>
                <option value="3">Travel</option>
                <option value="4">Tech</option>
                <option value="5">Mathematics</option>
              </select>
            </div>
            <div id="c-post-Btn" class="btn-primary">Create Post</div>
          </div>
        </div>
        <div id="posts"></div>
      </main>
    
      <div class="side-divs">
        <div class="profile-card">
          <div class="profile-header">
            <div class="profileImage">
              <img src="${avatar}" alt="">
            </div>
          </div>
          <div class="UserInfo-div">
            <p class="UserName-p">${username}</p>
            <p class="profile-title">Profile</p>
          </div>
        </div>
        <div class="categories-section">
          <h2 class="categories-text">Users</h2>
          <ul class="category-list"></ul>
        </div>
      </div>
    </div>
  `;

  // --- Modal & Form Logic ---
  const modal = document.getElementById("c-post-modal");
  const modalOpenBtn = document.getElementById("c-post-start");
  const createPostBtn = document.getElementById("c-post-Btn");
  const catToggleBtn = document.getElementById("cat-choose-Btn");
  const catSelectDiv = document.getElementById("c-post-cats");
  const imgUploadTrigger = document.getElementById("c-img-upload-trigger");
  const imgInput = document.getElementById("img-upload");

  if (modalOpenBtn) {
    modalOpenBtn.onclick = () => (modal.style.display = "block");
  }

  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
  };

  if (catToggleBtn) {
    catToggleBtn.onclick = () => {
      const isHidden = catSelectDiv.style.display === "none";
      catSelectDiv.style.display = isHidden ? "block" : "none";
    };
  }

  if (imgUploadTrigger) {
    imgUploadTrigger.onclick = () => imgInput.click();
  }

  if (createPostBtn) {
    createPostBtn.addEventListener("click", async () => {
      const postText = document.getElementById("c-post-textArea").value;
      const postCategory = document.getElementById("c-post-cat-select").value;
      
      let postImage = null;
      if (imgInput.files && imgInput.files[0]) {
        // postImage = await convertImageToBase64(imgInput.files[0]);
      }

      const postData = {
        user_token: State.user.token,
        post_text: postText,
        post_image_base64: postImage,
        post_category: postCategory,
      };

      try {
        const res = await fetch("/post/create", {
          method: "POST",
          body: JSON.stringify(postData),
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 201) {
          modal.style.display = "none";
          window.location.reload();
        } else {
          throw new Error(`Failed to create post: ${res.statusText}`);
        }
      } catch (error) {
        console.error("Post creation error:", error);
        alert("Error creating post. Please try again.");
      }
    });
  }

  // --- Like Button Logic ---
  const handleLike = (event) => {
    const btn = event.currentTarget;
    const img = btn.querySelector("img");
    if (!img) return;
    
    const isLiked = img.src.includes("liked.svg");
    img.src = isLiked ? "unliked.svg" : "liked.svg";
  };

  document.querySelectorAll(".p-likeBtn").forEach((btn) => {
    btn.addEventListener("click", handleLike);
  });

  // await OrgIndexPosts();
};
