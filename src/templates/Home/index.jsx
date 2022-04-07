/* eslint-disable no-useless-constructor */
import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { loadPosts } from "../../utils/loadPost";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPost = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPost);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  useEffect(() => {
    handleLoadPost(0, postsPerPage);
  }, [handleLoadPost, postsPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1>Search Value {searchValue}</h1>
          </>
        )}

        <TextInput
          type="search"
          searchValue={searchValue}
          handleChange={handleChange}
        />
      </div>
      {
        <>
          {filteredPosts.length > 0 ? (
            <Posts posts={filteredPosts} />
          ) : (
            <p> nao tem post</p>
          )}
        </>
      }
      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

// class Home2 extends Component {
//   state = {
//     counter: 0,
//     posts: [],
//     allPosts: [],
//     searchValue: "",
//     page: 0,
//     postsPerPage: 10,
//   };

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   loadMorePosts = () => {
//     const { page, postsPerPage, posts, allPosts } = this.state;

//     const nextPage = page + postsPerPage;
//     const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPost);

//     this.setState({ posts, page: nextPage });
//   };

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   };

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue
//       ? allPosts.filter((post) => {
//           return post.title.toLowerCase().includes(searchValue.toLowerCase());
//         })
//       : posts;
//     return (
//       <section className="container">
//         <div className="search-container">
//           {!!searchValue && (
//             <>
//               <h1>Search Value {searchValue}</h1>
//             </>
//           )}

//           <TextInput
//             type="search"
//             searchValue={searchValue}
//             handleChange={this.handleChange}
//           />
//         </div>
//         {
//           <>
//             {filteredPosts.length > 0 ? (
//               <Posts posts={filteredPosts} />
//             ) : (
//               <p> nao tem post</p>
//             )}
//           </>
//         }
//         <div className="button-container">
//           {!searchValue && (
//             <Button
//               text="Load more posts"
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Home;
