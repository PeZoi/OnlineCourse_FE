import { Avatar } from 'primereact/avatar';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaLink } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogsBySlugAPI, updateViewsCountBlogAPI } from 'src/api/blogApi';
import TippyModal from 'src/components/TippyModal';
import { URL_FE } from 'src/utils/constant';
import useScrollToTop from 'src/hooks/useScrollToTop';

export default function DetailBlogPage() {
   useScrollToTop();

   const { blogSlug } = useParams();
   const navigate = useNavigate();
   const [blog, setBlog] = useState();
   const [showMore, setShowMore] = useState(false);

   useEffect(() => {
      let timeout = null;
      if (blogSlug) {
         getBlogsBySlugAPI(blogSlug).then((res) => {
            if (res.status === 200) {
               setBlog(res.data);
               document.title = res.data.title;
               // Cập nhật views sau 10s
               timeout = setTimeout(() => {
                  updateViewsCountBlogAPI(res.data?.id).catch((err) => {
                     console.log(err);
                  });
               }, 10000);
            } else if (res.status === 404) {
               navigate('/not-found', { replace: true });
            }
         });
      }

      return () => {
         clearTimeout(timeout);
      };
   }, [blogSlug, navigate]);

   return (
      <div className="p-5 min-h-screen">
         <div className="mx-auto w-4/5">
            <h1 className="text-[40px] font-bold leading-relaxed">{blog?.title}</h1>
            <div className="my-10">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Avatar
                        image={blog?.avatar_user}
                        imageAlt="avatar"
                        className="size-12 rounded-full overflow-hidden"
                     />
                     <div className="flex flex-col justify-center flex-1">
                        <span className="text-base font-medium">{blog?.username}</span>
                        <div className="flex items-center gap-3 mt-1">
                           <span className="text-base">{blog?.created_at_format}</span>
                           <span>·</span>
                           <span className="text-base">{blog?.view} lượt xem</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <TippyModal
                        isShow={showMore}
                        setIsShow={setShowMore}
                        ModalChildren={
                           <div className="animate-fade h-fit rounded-lg shadow-base bg-white overflow-hidden">
                              <button
                                 className="flex items-center gap-3 w-full px-6 py-3 hover:bg-gray-light"
                                 onClick={() => {
                                    setShowMore(!showMore);
                                    toast('Đã sao chép liên kết');
                                    navigator.clipboard.writeText(`${URL_FE}/blog/${blog?.slug}`);
                                 }}
                              >
                                 <FaLink />
                                 <span>Sao chép liên kết</span>
                              </button>
                           </div>
                        }
                        TriggerChildren={
                           <button onClick={() => setShowMore(!showMore)}>
                              <HiOutlineDotsHorizontal className="size-5" />
                           </button>
                        }
                     />
                  </div>
               </div>
            </div>

            <div className="ql-snow">
               <div className="ql-editor" dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
            </div>

            {/* 
            <div
               className="MarkdownParser_wrapper__JYN63 BlogDetail_markdownParser__QFL3L"
               style={{
                  fontSize: '1.4rem',
                  lineHeight: '2',
               }}
            >
               <h2 id="i-gioi-thieu-so-luoc" data-appended="true">
                  I. Giới thiệu sơ lược
               </h2>
               <p>
                  Hello anh em , thì như
                  <a
                     href="https://fullstack.edu.vn/blog/cach-chinh-theme-oh-my-posh-cho-powershell.html"
                     target="_blank"
                     rel="noreferrer"
                  >
                     blog trước
                  </a>
                  mình có nói rằng mình ko có dùng Ubuntu, nhưng sao lại có blog này 🤨?
               </p>
               <p>
                  À thì mình mới cài lại Win 10, vì máy mình cũng yếu 😔, mà ko có tiền mua nên mình đã cài lùi về Win10
                  xài cho nó sướng nha. Chứ đừng có nói mình bị thành người {'"tối cổ "'} nha 😫.
               </p>
               <p>
                  Lại nói về trước đó nữa, mình đã tu luyện thành pháp sư WSL nhưng vì Win11 mình cài nó cứ lag và cấu
                  hình ko hợp nên mình có thành tài cũng đến Tết Công Gô mới cài nổi. May thay, nhờ có anh F8 chỉ cách
                  cài trên Win10 và phần vì mình cũng đang xài con Win10 nên mình cài thử, ko ngờ lại thành công ngoài
                  sức tưởng tưởng ! Chắc mình truyền lại cái Win10 cho con cháu Dev đời sau luôn quá 🥰
               </p>
               <p>Hình ành của con em WSL sau khi config:</p>
               <p>
                  <img
                     alt="image.png"
                     src="https://files.fullstack.edu.vn/f8-prod/blog_posts/10265/6628df53e25a0.png"
                     style={{ cursor: 'pointer' }}
                  />
               </p>
               <p>
                  <strong>
                     Thôi lòng vòng đủ rồi, hôm nay mình sẽ chỉ các bạn tóm tắt cách setup một em WSL giống mình nhé 😊
                  </strong>
               </p>
               <h3>Nhớ coi xong like nhiều cho mình nếu các bạn cũng làm được nhé 👍</h3>
               <h2 id="ii-hanh-trinh-tu-luyen-wsl" data-appended="true">
                  II Hành trình tu luyện WSL 😆
               </h2>
               <h3>Bước 1: Cài WSL:</h3>
               <p>
                  Hiện nay có khá nhiều bạn đang dùng Powershell nhưng lại lười config lên một đẳng cấp mới như WSL, và
                  người ta luôn có câu:
               </p>
               <blockquote>
                  <p>
                     Trên bước đường thành công ko có dấu chân của kẻ thông minh, người lười biếng họ ko đi bộ, họ đi
                     bằng ô tô, trực thăng, tên lửa 😂 (Thánh Wibu)
                  </p>
               </blockquote>
               <p>Vậy nên mình sẽ giúp người lười biếng thành công nhé!</p>
               <p>
                  Coi video này để nắm rõ các bước nhé!
                  <a
                     href="/external-url?continue=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dypvjxw5qBK0"
                     target="_blank"
                     rel="noreferrer"
                  >
                     https://www.youtube.com/watch?v=ypvjxw5qBK0
                  </a>
               </p>
               <p>
                  <strong>Anh em nhớ là hãy cài Ubuntu hay Debian cho nó tương thích code của mình nhoa 😘</strong>
               </p>
               <h3>Bước 2: Cài Zsh:</h3>
               <p>
                  Wait wait! Đợi đã, vội chi, vội là ch*t đấy!🤣 Vì chúng ta chưa update package của ubuntu nên cần
                  update nha:
               </p>
               <pre>
                  <code>sudo apt update &amp;&amp; sudo apt upgrade</code>
               </pre>
               <p>Rồi install luôn build essential để phòng trừ thiên tai cho tương lai gần:</p>
               <pre>
                  <code>sudo apt install build-essential</code>
               </pre>
               <p>Giờ mới tải Zsh nhoa 😘:</p>
               <pre>
                  <code>sudo apt install zsh</code>
               </pre>
               <p>Cài thêm một số thứ như Git nhé:</p>
               <pre>
                  <code>sudo apt install git</code>
               </pre>
               <p>Các bạn copy từng đoạn một các bạn nhớ nhập mật khẩu các bạn vào nhé! Ko thì toang</p>
               <p>GIờ thì bắt đầu cài đặt Zsh nhé!</p>
               <h3>3. Hành trình tu luyện Zsh</h3>
               <p>Giờ các bạn hãy cài Oh-my-zsh theo curl nhé!</p>
               <pre>
                  <code>
                     sh -c {'"$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"'}
                  </code>
               </pre>
               <p>Các bạn cũng có thể cài qua wget nữa:</p>
               <pre>
                  <code>
                     sh -c {'"$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"'}
                  </code>
               </pre>
               <p>Cài xong nó hỏi gì các bạn cứ yes hết cho mình nha.</p>
               <h3>
                  Lưu ý quan trọng: Các bạn hãy cài 1 cái Nerd Font và một cái theme cho Window Terminal nhé nếu ko muốn
                  thất bại trong bước tiếp theo
               </h3>
               <p>Giờ hãy cài Powerlevel10k nhé:</p>
               <pre>
                  <code>
                     git clone --depth=1 https://github.com/romkatv/powerlevel10k.git{' '}
                     {'${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}'}/themes/powerlevel10k
                  </code>
               </pre>
               <p>rồi các bạn nhập cho mình</p>
               <pre>
                  <code>vi ~/.zshrc</code>
               </pre>
               <p>
                  Hãy sửa cài phần theme nhé!
                  <img
                     alt="image.png"
                     src="https://files.fullstack.edu.vn/f8-prod/blog_posts/10265/6628e592e0ab8.png"
                     style={{ cursor: 'pointer' }}
                  />
               </p>
               <p>Sau khi xong rồi các bạn load màn hình Ubuntu mới là sẽ có sự khác biệt:</p>
               <p>
                  <img
                     alt="image.png"
                     src="https://files.fullstack.edu.vn/f8-prod/blog_posts/10265/6628e5dabe1b6.png"
                     style={{ cursor: 'pointer' }}
                  />
               </p>
               <p>Làm theo yêu cầu của nó là sẽ có kết quả ngon thôi 😋!</p>
               <h3>Bước 3: Các config phụ:</h3>
               <p>Các bạn hãy code theo mình nhé!</p>
               <ol>
                  <li>Cài zsh-autosuggestions:</li>
               </ol>
               <pre>
                  <code>
                     git clone https://github.com/zsh-users/zsh-autosuggestions ${'{ZSH_CUSTOM:-~/.oh-my-zsh/custom}'}
                     /plugins/zsh-autosuggestions
                  </code>
               </pre>
               <p>Rồi tới zsh-syntax-highlighting</p>
               <pre>
                  <code>
                     git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $
                     {'{ZSH_CUSTOM:-~/.oh-my-zsh/custom}'}/plugins/zsh-syntax-highlighting
                  </code>
               </pre>
               <p>Xong rồi thì các bạn chỉnh phần plugins=(...) trong ~/.zshrc cho mình nhé:</p>
               <p>
                  <img
                     alt="image.png"
                     src="https://files.fullstack.edu.vn/f8-prod/blog_posts/10265/6628e752064eb.png"
                     style={{ cursor: 'pointer' }}
                  />
               </p>
               <h2 id="iii-ket-luan" data-appended="true">
                  III. Kết luận
               </h2>
               <p>
                  Vậy là mình đã setup xong 1 em WSL rồi, giờ có thể code thỏa thích luôn 😋, mình chức các bạn thành
                  công trong việc setup nhé!
               </p>
            </div> */}
         </div>
      </div>
   );
}
