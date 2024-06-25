import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import uploadImageToCloudinary from '../../utils/uploadCloudinary'
import {BASE_URL,token} from '../../config'
import {toast} from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

const Profile = ({user}) => {

    const [selectedFile, setSelectedFile] = useState(null);
    // const [previewURL, setPreviewURL] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData , setFormData] = useState({
      name : "",
      email : "",
      password : "",
      photo : null,
      gender : "",
      bloodType : ""
  
    });
  
    useEffect(()=>{
        setFormData({name:user.name , email:user.email , photo:user.photo , gender:user.gender, bloodType:user.bloodType})
    },[user])
  
    const handleInputChange = e => {
      setFormData({...formData,[e.target.name]:e.target.value})
    }
  
    const handleFileInputChange = async (event)=>{
      const file = event.target.files[0];
      // Update this later
      // console.log(file)
      const data = await uploadImageToCloudinary(file);
      // console.log(data)
    //   setPreviewURL(data.url);
      setSelectedFile(data.url);
      setFormData({...formData,photo:data.url})
    }
  
    const submitHandler = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/users/${user._id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json', // Corrected here
                Authorization : `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
          // mode: 'no-cors' // Removed this
        });
        // console.log(formData);
        
        if (!res.ok) {
          const { message } = await res.json();
          // console.log(message);
          throw new Error(message);
        }
        
        const { message } = await res.json(); // This should now work
        // console.log(message);
    
        setLoading(false);
        toast.success(message);
        navigate('/users/profile/me');
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    };

  return (
    <div className='mt-10'>
      <form className="py-4 md:py-0" onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            aria-readonly
            readOnly
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Blood Type"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          {/* <label className="text-headingColor font-bold text-[16px] leading-7">
            Are you a:
            <select
              name="role"
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              onChange={handleInputChange}
              value={formData.role}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </label> */}
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Gender:
            <select
              name="gender"
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              onChange={handleInputChange}
              value={formData.gender}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="flex items-center gap-4">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor">
              <img
                src={formData.photo}
                className="w-full h-full object-cover rounded-full"
                alt=""
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              // onChange={handleInputChange}
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[20px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={25} color="white" /> : "Update"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Profile;
