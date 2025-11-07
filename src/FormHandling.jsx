// // import React, { useState } from 'react';


// // const FormHandling = () => {

// //     const [email, setEmail] = useState("");
// //     const [selected, setSelected] = useState([]);
// //     const [fromEmail, setFromEmail] = useState("");
// //     const [header, setHeader] = useState("");
// //     const [message, setMessage] = useState("");

// //     const handlesubmit = (e) => {
// //         e.preventDefault();

// //         if (email === '') {
// //             alert('Please enter your email');
// //             return;
// //         }

// //         if (!email.includes('@gmail.com')) {
// //             alert('Please enter a valid email');
// //             return;
// //         }

// //         if (selected.includes(email)) {
// //             alert('This email already exists');
// //             return;
// //         }

// //         setSelected([...selected, email]);
// //         setFromEmail(email);
// //         setEmail("");
// //         console.log(email);
// //     }

// //     const handlesubmit2 = (e) => {
// //         e.preventDefault();

// //         selected.map((email, index) => {
// //             if (email === fromEmail) {
// //                 setHeader(header);
// //                 setMessage(message);
// //             }
// //         })
// //     }
// //     return (
// //         <>
// //             <div className="absolute top-1/2 left-1/2 w-[90vw] sm:w-[75vw] lg:w-[40vw] transform -translate-x-1/2 -translate-y-1/2 bg-[#161616] text-white px-4 md:px-8 lg:px-14 py-4 md:py-6 lg:py-10 rounded-md">
// //                 <form onSubmit={handlesubmit}>
// //                     <h1>Form Handling</h1>
// //                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className='w-full px-4 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500' />
// //                     <button type='submit' className="mt-4 lg:mt-6 text-sm sm:text-xl px-3 py-2 rounded-md bg-white text-black font-semibold border border-[#ffffff42]">Submit</button>
// //                 </form><br />
// //                 <form onSubmit={handlesubmit2}>
// //                     <h1>See Email Id</h1>
// //                     <select name="email" id="email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} className="w-full px-4 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
// //                         {
// //                             selected.map((email, index) => (
// //                                 <option key={index} value={email}>{email}</option>
// //                             ))
// //                         }
// //                     </select>
// //                     <input type="text" placeholder='Header' value={header} onChange={(e) => setHeader(e.target.value)} className='w-full px-4 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500' />
// //                     <input type="text" placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} className='w-full px-4 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500' />
// //                     <button type='submit' className="mt-4 lg:mt-6 text-sm sm:text-xl px-3 py-2 rounded-md bg-white text-black font-semibold border border-[#ffffff42]">Submit</button>
// //                 </form>
// //             </div>
// //             <div>
// //                 <table>
// //                     <thead>
// //                         <tr>
// //                             <th>From</th>
// //                             <th>Header</th>
// //                             <th>Message</th>
// //                         </tr>
// //                         <tr>
// //                             {
// //                                 selected.map((email, index) => (
// //                                     <tr key={index}>
// //                                         <td>{email}</td>
// //                                         <td>{header}</td>
// //                                         <td>{message}</td>
// //                                     </tr>
// //                                 ))
// //                             }
// //                         </tr>
// //                     </thead>
// //                 </table>
// //             </div>
// //         </>
// //     )
// // }

// // export default FormHandling;

// import React, { useState } from 'react';

// const FormHandling = () => {
//   const [emailInput, setEmailInput] = useState("");
//   const [fromEmail, setFromEmail] = useState("");
//   const [header, setHeader] = useState("");
//   const [message, setMessage] = useState("");
//   const [emailList, setEmailList] = useState([]); // dropdown list
//   const [dataList, setDataList] = useState([]);   // table data

//   // Add email to dropdown list
//   const handleEmailAdd = (e) => {
//     e.preventDefault();
//     if (emailInput === "" || !emailInput.includes("@gmail.com")) {
//       alert("Please enter a valid Gmail address");
//       return;
//     }
//     if (emailList.includes(emailInput)) {
//       alert("Email already exists");
//       return;
//     }

//     setEmailList([...emailList, emailInput]);
//     setFromEmail(emailInput); // set default selected
//     setEmailInput(""); // clear input
//   };

//   // Submit full form
//   const handleFullSubmit = (e) => {
//     e.preventDefault();

//     if (fromEmail === "" || header === "" || message === "") {
//       alert("All fields required");
//       return;
//     }

//     setDataList([
//       ...dataList,
//       { from: fromEmail, header: header, message: message }
//     ]);

//     // clear only header/message
//     setHeader("");
//     setMessage("");
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-gray-900 text-white rounded-md">
//       <h2 className="text-xl font-bold mb-4">Add Email to Dropdown</h2>

//       {/* Email Add Form */}
//       <form onSubmit={handleEmailAdd} className="mb-6">
//         <input
//           type="email"
//           value={emailInput}
//           onChange={(e) => setEmailInput(e.target.value)}
//           placeholder="Enter email"
//           className="w-full mb-3 p-2 rounded text-white"
//         />
//         <button
//           type="submit"
//           className="w-full bg-white text-black py-2 rounded font-semibold"
//         >
//           Add Email
//         </button>
//       </form>

//       {/* Full Form with From + Header + Message */}
//       <h2 className="text-xl font-bold mb-4">Form Submission</h2>
//       <form onSubmit={handleFullSubmit}>
//         <select
//           value={fromEmail}
//           onChange={(e) => setFromEmail(e.target.value)}
//           className="w-full mb-3 p-2 rounded text-white"
//         >
//           <option value="">-- Select From Email --</option>
//           {emailList.map((email, idx) => (
//             <option key={idx} value={email}>{email}</option>
//           ))}
//         </select>

//         <input
//           type="text"
//           value={header}
//           onChange={(e) => setHeader(e.target.value)}
//           placeholder="Enter header"
//           className="w-full mb-3 p-2 rounded text-white"
//         />
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Enter message"
//           className="w-full mb-3 p-2 rounded text-white"
//         />

//         <button
//           type="submit"
//           className="w-full bg-white text-black py-2 rounded font-semibold"
//         >
//           Submit
//         </button>
//       </form>

//       {/* Table Output */}
//       {dataList.length > 0 && (
//         <table className="mt-6 w-full border border-white text-white text-sm">
//           <thead className="bg-gray-700">
//             <tr>
//               <th className="border p-2">From</th>
//               <th className="border p-2">Header</th>
//               <th className="border p-2">Message</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataList.map((item, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{item.from}</td>
//                 <td className="border p-2">{item.header}</td>
//                 <td className="border p-2">{item.message}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default FormHandling;


// import React, { useEffect, useState } from "react";

// const FormHandling = () => {

//     const [emailList, setEmailList] = useState([]);
//     const [FromEmail, setFromEmail] = useState([]);
//     const [dataList, setDataList] = useState([]);

//     useEffect(() => {
//         localStorage.setItem('dataList', JSON.stringify(dataList));
//     }, [dataList])


//     useEffect(() => {
//         const favs = localStorage.getItem('dataList');
//         if (favs) {
//             setDataList(JSON.parse(favs));
//         }
//     }, [])
//     const [formData, setFormData] = useState({
//         email: '',
//         header: '',
//         message: '',
//     })


//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleEmailAdd = (e) => {
//         e.preventDefault();

//         if (formData.email === '' || !formData.email.includes('@gmail.com')) {
//             alert('Please enter a valid email');
//             return;
//         }
//         if (emailList.includes(formData.email)) {
//             alert('This email already exists');
//             return;
//         }

//         setEmailList([...emailList, formData.email]);
//         setFromEmail(formData.email);
//         setFormData({
//             email: '',
//             header: '',
//             message: ''
//         })
//     }

//     const handlesubmit = (e) => {
//         e.preventDefault();

//         if (formData.header === '' || formData.message === '') {
//             alert('All fields required');
//             return;
//         }

//         const newEntries = FromEmail.map((email, index) => ({
//             from: email, header: formData.header, message: formData.message, isfav: false
//         }))

//         setDataList([
//             ...dataList,
//             ...newEntries
//         ]);

//         setFormData({
//             email: '',
//             header: '',
//             message: ''
//         })
//     }

//     const handleDelete = (id) => {
//         setDataList(dataList.filter((_, index) => index !== id));
//     }

//     const handleFavToggle = (index) => {
//         const updated = [...dataList];
//         updated[index].isFav = !updated[index].isFav;
//         setDataList(updated);
//     };


//     return (
//         <>
//             <div className="p-30">
//                 <form onSubmit={handleEmailAdd}>
//                     <h1>Form Handling</h1>
//                     <input type="email" name="email" placeholder="Eter your email" value={formData.email} onChange={handleChange} className='w-full px-4 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100' />
//                     <button type="submit">Add Email</button>
//                 </form>
//             </div>
//             <div className="p-30">
//                 <form onSubmit={handlesubmit}>
//                     <select multiple value={FromEmail} onChange={(e) => {
//                         const selected = Array.from(e.target.selectedOptions).map(option => option.value);
//                         setFromEmail(selected);
//                     }}>
//                         {/* <option value="" className="bg-gray-500">Select From Email</option> */}
//                         {
//                             emailList.map((email, index) => (
//                                 <div key={index}>
//                                     <option value={email}>{email}</option>
//                                 </div>
//                             ))
//                         }
//                     </select>

//                     <input type="text" placeholder="header" name="header" value={formData.header} onChange={handleChange} className='w-full px-4 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100' />
//                     <input type="text" placeholder="message" name="message" value={formData.message} onChange={handleChange} className='w-full px-4 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100' />
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//             <div className="pl-30">
//                 <h2>Email List</h2>
//                 <table border={1} cellPadding={7} cellSpacing={0}>
//                     <thead>
//                         <tr>
//                             <th>From</th>
//                             <th>Header</th>
//                             <th>Message</th>
//                             <th>Actions</th>
//                             <th>Favourite</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             dataList.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{item.from}</td>
//                                     <td>{item.header}</td>
//                                     <td>{item.message}</td>
//                                     <td>
//                                         <button onClick={() => handleFavToggle(index)} type="button">{item.isFav ? "★ Favourited" : "☆ Add to Fav"}</button>
//                                     </td><br />
//                                     <td>
//                                         <button onClick={() => handleDelete(index)} type="button">Delete</button>
//                                     </td>

//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     )
// }

// export default FormHandling;

// import React, { useState } from 'react';

// const PopupExample = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpen = () => {
//     setIsOpen(!isOpen); // Toggle the popup
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto text-center">
//       <h2
//         onClick={handleOpen}
//         className="text-2xl font-bold mb-4 cursor-pointer text-blue-600 hover:underline"
//       >
//         Popup Example (Click Me)
//       </h2>

//       {isOpen && (
//         <p className="text-gray-700 bg-gray-100 p-3 rounded shadow">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quaerat laboriosam assumenda nobis. Illum, porro!
//         </p>
//       )}
//     </div>
//   );
// };

// export default PopupExample;













// import React, { useState } from 'react';

// const usersData = [
//     { id: 1, name: 'Himanshu' },
//     { id: 2, name: 'Harsh' },
//     { id: 3, name: 'Aman' },
//     { id: 4, name: 'Kunal' },
//     { id: 5, name: 'Neha' },
//     { id: 6, name: 'Riya' },
//     { id: 7, name: 'Ajay' },
//     { id: 8, name: 'Vikas' },
//     { id: 9, name: 'Tina' },
//     { id: 10, name: 'Rahul' },
//     { id: 11, name: 'Sneha' },
//     { id: 12, name: 'Mohit' },
// ];

// const App = () => {
//     const [search, setSearch] = useState('');
//     const [page, setPage] = useState(1);
//     const itemsPerPage = 4;

//     // ✅ Step 1: Filter based on search
//     const filteredUsers = usersData.filter(user =>
//         user.name.toLowerCase().includes(search.toLowerCase())
//     );

//     // ✅ Step 2: Paginate filtered data
//     const start = (page - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     const paginatedUsers = filteredUsers.slice(start, end);

//     // ✅ Step 3: Total Pages
//     const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//     return (
//         <div className="p-4">
//             <h1 className="text-xl font-bold">Search + Pagination</h1>

//             {/* 🔍 Search Box */}
//             <input
//                 type="text"
//                 placeholder="Search name..."
//                 value={search}
//                 onChange={(e) => {
//                     setSearch(e.target.value);
//                     setPage(1); // reset to page 1 on new search
//                 }}
//                 className="border p-2 my-4 w-full"
//             />

//             {/* 📋 Show Paginated List */}
//             {paginatedUsers.length > 0 ? (
//                 paginatedUsers.map((user) => (
//                     <div key={user.id} className="border p-2 mb-2">
//                         {user.name}
//                     </div>
//                 ))
//             ) : (
//                 <p>No users found</p>
//             )}

//             {/* ⏮️ Pagination Buttons */}
//             <div className="mt-4 flex justify-between">
//                 <button
//                     disabled={page === 1}
//                     onClick={() => setPage(page - 1)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
//                 >
//                     Prev
//                 </button>
//                 <span>
//                     Page {page} of {totalPages}
//                 </span>
//                 <button
//                     disabled={page === totalPages}
//                     onClick={() => setPage(page + 1)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default App;









// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TMDB_API_KEY = '590aea04d220db1227327cf0517c902a'; // ← yahan apna API key daalo
// const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

// const TMDBMovies = () => {
//     const [allMovies, setAllMovies] = useState([]);
//     const [search, setSearch] = useState('');
//     const [page, setPage] = useState(1);
//     const itemsPerPage = 5;

//     // ✅ Fetch Movies
//     useEffect(() => {
//         axios.get(API_URL)
//             .then((res) => {
//                 setAllMovies(res.data.results); // TMDB gives array in `results`
//             })
//             .catch((err) => console.error("API Error", err));
//     }, []);

//     // ✅ Filter based on title
//     const filteredMovies = allMovies.filter(movie =>
//         movie.title.toLowerCase().includes(search.toLowerCase())
//     );

//     // ✅ Paginate filtered list
//     const start = (page - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     const paginatedMovies = filteredMovies.slice(start, end);

//     // ✅ Calculate total pages
//     const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
//     return (
//         <div className="p-4">
//             <h1 className="text-xl font-bold mb-4">🎬 TMDB Movies Filter + Pagination</h1>

//             <input
//                 type="text"
//                 placeholder="Search movie title..."
//                 value={search}
//                 onChange={(e) => {
//                     setSearch(e.target.value);
//                     setPage(1); // Reset page on new search
//                 }}
//                 className="border p-2 w-full mb-4"
//             />

//             {/* 📝 Movie List */}
//             {paginatedMovies.length > 0 ? (
//                 paginatedMovies.map((movie) => (
//                     <div key={movie.id} className="border p-2 mb-2">
//                         <h2 className="font-semibold">{movie.title}</h2>
//                         <p>⭐ {movie.vote_average}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No movies found</p>
//             )}

//             {/* ⏮️ Pagination Controls */}
//             <div className="flex justify-between items-center mt-4">
//                 <button
//                     onClick={() => setPage(page - 1)}
//                     disabled={page === 1}
//                     className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
//                 >
//                     Prev
//                 </button>
//                 <span>
//                     Page {page} of {totalPages}
//                 </span>
//                 <button
//                     onClick={() => setPage(page + 1)}
//                     disabled={page === totalPages}
//                     className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TMDBMovies;
