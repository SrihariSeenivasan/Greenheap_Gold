import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  addOrnament,
  deleteOrnament,
  fetchAllOrnaments,
  updateOrnament,
} from "../../features/thunks/adminThunks";
import { setCurrentOrnament } from "../../features/slices/adminSlice";

const emptyForm = {
  name: "",
  price: 0,
  category: "",
  subCategory: "",
  gender: "Female" as "Male" | "Female" | "Unisex",
  description: "",
  description1: "",
  description2: "",
  description3: "",
  material: "",
  purity: "",
  quality: "",
  details: "",
};

const ManageOrnaments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ornaments, status, error, currentPage, totalPages, currentOrnament } = useSelector((state: RootState) => state.admin);

  const [form, setForm] = useState(emptyForm);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [subImageFiles, setSubImageFiles] = useState<File[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>([]);

  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    dispatch(fetchAllOrnaments({ page: 0, size: 5 }));
  }, [dispatch]);

  useEffect(() => {
    if (currentOrnament) {
      const { id, mainImage, subImages, ...formData } = currentOrnament;
      setForm({
        ...emptyForm,
        ...formData,
        description1: formData.description1 ?? "",
        description2: formData.description2 ?? "",
        description3: formData.description3 ?? "",
      });
      setMainImagePreview(mainImage);
      setSubImagePreviews(subImages);
    } else {
    }
  }, [currentOrnament]);

  const isLoading = status === 'loading';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      if (name === 'mainImage') {
        setMainImageFile(file);
        setMainImagePreview(previewUrl);
      } else {
        const index = parseInt(name.replace('subImage', ''), 10);
        setSubImageFiles(prev => {
          const newFiles = [...prev];
          newFiles[index] = file;
          return newFiles;
        });
        setSubImagePreviews(prev => {
          const newPreviews = [...prev];
          newPreviews[index] = previewUrl;
          return newPreviews;
        });
      }
    }
  };


  const handleSave = async () => {
    if (!form.name || form.price <= 0 || (!mainImageFile && !currentOrnament)) {
      alert("Please fill all required fields and upload a main image.");
      return;
    }

    const actionToDispatch = currentOrnament
      ? updateOrnament({
        id: currentOrnament.id,
        data: form,
        mainImage: mainImageFile ?? undefined,
        subImages: subImageFiles.filter(Boolean) ?? undefined,
      })
      : addOrnament({
        data: form,
        mainImage: mainImageFile!,
        subImages: subImageFiles.filter(Boolean),
      });

    try {
      await dispatch<any>(actionToDispatch).unwrap();
      const pageToFetch = currentOrnament ? currentPage : 0;
      dispatch(fetchAllOrnaments({ page: pageToFetch, size: 5 }));
      handleCancel();

    } catch (err) {
      console.error("Failed to save ornament:", err);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this ornament?")) {
      dispatch(deleteOrnament(id));
    }
  };

  const handleEdit = (ornament: any) => {
    dispatch(setCurrentOrnament(ornament.id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setMainImageFile(null);
    setSubImageFiles([]);
    setMainImagePreview(null);
    setSubImagePreviews([]);
    dispatch(setCurrentOrnament(null));
    setFormKey(prevKey => prevKey + 1);
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchAllOrnaments({ page, size: 5 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white p-2 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#7a1335] mb-4 sm:mb-8">Manage Ornaments</h1>
      <div key={formKey} className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 mb-6 sm:mb-10">
        <h2 className="text-xl font-bold text-[#7a1335] mb-4">{currentOrnament ? 'Edit Ornament' : 'Add New Ornament'}</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex flex-col gap-4">
            <input type="text" name="name" placeholder="Ornament Name *" value={form.name} onChange={handleChange} className="px-3 py-2 border rounded w-full" required />
            <input type="number" name="price" placeholder="Price *" value={form.price} onChange={handleChange} className="px-3 py-2 border rounded w-full" required />
            <input type="text" name="category" placeholder="Category *" value={form.category} onChange={handleChange} className="px-3 py-2 border rounded w-full" />
            <input type="text" name="subCategory" placeholder="Sub Category *" value={form.subCategory} onChange={handleChange} className="px-3 py-2 border rounded w-full" />
            <select name="gender" value={form.gender} onChange={handleChange} className="px-3 py-2 border rounded w-full bg-white">
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <input type="text" name="material" placeholder="Material *" value={form.material} onChange={handleChange} className="px-3 py-2 border rounded w-full" />
            <input type="text" name="purity" placeholder="Purity (e.g., 24K) *" value={form.purity} onChange={handleChange} className="px-3 py-2 border rounded w-full" />
            <input type="text" name="quality" placeholder="Quality *" value={form.quality} onChange={handleChange} className="px-3 py-2 border rounded w-full" />
            <input type="text" name="details" placeholder="Details *" value={form.details} onChange={handleChange} className="px-3 py-2 border rounded w-full" />
            <textarea name="description" placeholder="Main Description *" value={form.description} onChange={handleChange} className="px-3 py-2 border rounded w-full h-24" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <label className="block font-semibold text-[#7a1335] mb-2">Main Image *</label>
              <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-[#7a1335] rounded-lg bg-[#fbeaf0]">
                {mainImagePreview && <img src={mainImagePreview} alt="Main" className="w-32 h-32 object-contain rounded-lg shadow" />}
                <label className="w-full flex flex-col items-center">
                  <input
                    type="file"
                    name="mainImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required={!currentOrnament}
                  />
                  <button
                    type="button"
                    className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-bold py-2 px-6 rounded-lg shadow transition mt-2 flex items-center gap-2"
                    onClick={e => {
                      const input = (e.currentTarget.parentElement?.querySelector('input[type="file"]') as HTMLInputElement | null);
                      input?.click();
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                    Upload main image
                  </button>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#7a1335] mb-2">Product Gallery Images</label>
              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="flex flex-col items-center gap-2 p-3 border rounded-lg bg-[#fbeaf0]">
                    {subImagePreviews[index] && (
                      <img src={subImagePreviews[index]} alt={`Sub Preview ${index + 1}`} className="w-20 h-20 object-contain rounded border mb-2" />
                    )}
                    <label className="w-full flex flex-col items-center">
                      <input
                        type="file"
                        name={`subImage${index}`}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-1 px-4 rounded transition mt-2"
                        onClick={e => {
                          const input = (e.currentTarget.parentElement?.querySelector('input[type="file"]') as HTMLInputElement | null);
                          input?.click();
                        }}
                      >
                        Upload
                      </button>
                    </label>
                    <span className="text-xs text-gray-500">
                      img{index + 1}{index < 2 ? " *" : " (optional)"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} disabled={isLoading} className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50">
            {isLoading ? 'Saving...' : (currentOrnament ? 'Update Ornament' : 'Add Ornament')}
          </button>
          <button onClick={handleCancel} disabled={isLoading} className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded transition">
            Cancel
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {ornaments.map((ornament) => (
          <div key={ornament.id} className="bg-white rounded-xl shadow-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-4">
              <img src={ornament.mainImage} alt={ornament.name} className="w-20 h-20 object-contain rounded-lg" />
              <div>
                <h3 className="font-bold text-lg text-[#7a1335]">{ornament.name}</h3>
                <p className="text-gray-600">{ornament.category} / {ornament.subCategory}</p>
              </div>
            </div>
            <div className="text-gray-700">
              <p><span className="font-semibold">Price:</span> ${ornament.price}</p>
              <p><span className="font-semibold">Material:</span> {ornament.material} ({ornament.purity})</p>
            </div>
            <div className="text-sm text-gray-600 line-clamp-3">
              {ornament.description}
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => handleEdit(ornament)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">Edit</button>
              <button onClick={() => handleDelete(ornament.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-2">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} className="px-4 py-2 bg-[#7a1335] text-white rounded disabled:opacity-50">Prev</button>
        <span className="font-semibold">Page {currentPage + 1} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1} className="px-4 py-2 bg-[#7a1335] text-white rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

export default ManageOrnaments;