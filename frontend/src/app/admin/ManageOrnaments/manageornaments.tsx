import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import {
  addOrnament,
  deleteOrnament,
  fetchAllOrnaments,
  updateOrnament,
  type OrnamentApiData,
} from "../../features/thunks/adminThunks";
import { setCurrentPage } from "../../features/slices/adminSlice";
import type { Ornament } from "../../types/type";

// --- CONSTANTS ---
const CATEGORY_TREE = [
    {
      name: "Indian Gold",
      children: [
        {
          name: "Men",
          items: ["Bracelets", "Rings", "Necklaces", "Cufflinks", "Earrings", "Tie"]
        },
        {
          name: "Women",
          items: ["Earrings", "Rings", "Necklaces", "Bracelets", "Bangles"]
        },
        {
          name: "Kid",
          items: ["Earrings", "Rings", "Necklaces", "Bracelets", "Bangles"]
        },
        {
          name: "Unisex",
          items: ["Earrings", "Rings", "Necklaces", "Bracelets", "Bangles", "Cufflinks", "Tie"]
        },
        {
          name: "Gold Coin",
          items: [
            {
              name: "22k Gold Coin",
              items: ["1g", "2g", "5g", "10g"]
            },
            {
              name: "24k Gold Coin",
              items: ["1g", "2g", "5g", "10g"]
            }
          ]
        }
      ]
    },
    {
      name: "Dubai Gold",
      children: [
        {
          name: "Men",
          items: ["Bracelets", "Rings", "Necklaces", "Cufflinks", "Earrings", "Tie"]
        },
        {
          name: "Women",
          items: ["Earrings", "Rings", "Necklaces", "Bracelets", "Bangles"]
        },
        {
          name: "Kid",
          items: ["Earrings", "Rings", "Necklaces", "Bracelets", "Bangles"]
        },
        {
          name: "Unisex",
          items: ["Earrings", "Rings", "Necklaces", "Bracelets", "Bangles", "Cufflinks", "Tie"]
        },
        {
          name: "Gold Coin",
          items: [
            {
              name: "22k Gold Coin",
              items: ["1g", "2g", "5g", "10g"]
            },
            {
              name: "24k Gold Coin",
              items: ["1g", "2g", "5g", "10g"]
            }
          ]
        }
      ]
    }
];

const emptyFormState = {
  id: null,
  name: "",
  price: "",
  details: "",
  material: "",
  purity: "",
  quality: "",
  description: "",
  description1: "",
  description2: "",
  description3: "",
  priceBreakups: [],
};

const emptyBreakup = { component: "", goldRate18kt: "", weightG: "", discount: "", finalValue: "" };

const ManageOrnaments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ornaments, status, error, currentPage, totalPages, pageSize } = useSelector((state: RootState) => state.admin);

 
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState<any>(emptyFormState);
  const [breakupForm, setBreakupForm] = useState<any>(emptyBreakup);
  const [editingBreakupIdx, setEditingBreakupIdx] = useState<number | null>(null);
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);
  
 
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [subImageFiles, setSubImageFiles] = useState<(File | null)[]>(Array(4).fill(null));
  const [imagePreviews, setImagePreviews] = useState({ main: "", subs: Array(4).fill("") });

  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [genderCategory, setGenderCategory] = useState("");
  const [item, setItem] = useState("");

  useEffect(() => {
    dispatch(fetchAllOrnaments({ page: currentPage, size: pageSize }));
  }, [currentPage, dispatch, pageSize]);

  const resetAndHideForm = () => {
    setForm(emptyFormState);
    setMainImageFile(null);
    setSubImageFiles(Array(4).fill(null));
    setImagePreviews({ main: "", subs: Array(4).fill("") });
    setBreakupForm(emptyBreakup);
    setEditingBreakupIdx(null);
    setShowPriceBreakup(false);
    setMainCategory("");
    setSubCategory("");
    setGenderCategory("");
    setItem("");
    setIsFormVisible(false);
  };

  const handleAddNew = () => {
    resetAndHideForm();
    setIsFormVisible(true);
  };

  const handleEdit = (product: Ornament) => {
    setIsFormVisible(true);
    setForm({ ...product, price: product.price.toString() });
    setMainCategory(product.category);
    setSubCategory(product.subCategory);
    setGenderCategory(product.gender);
    setImagePreviews({
        main: product.mainImage,
        subs: product.subImages ? [...product.subImages, ...Array(4 - product.subImages.length).fill("")] : Array(4).fill("")
    });
    setShowPriceBreakup(false);
    window.scrollTo(0, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    if (index === undefined) {
      setMainImageFile(file);
      setImagePreviews(p => ({ ...p, main: previewUrl }));
    } else {
      setSubImageFiles(f => {
        const newFiles = [...f];
        newFiles[index] = file;
        return newFiles;
      });
      setImagePreviews(p => {
        const newSubs = [...p.subs];
        newSubs[index] = previewUrl;
        return { ...p, subs: newSubs };
      });
    }
  };

  const handleProductFormSave = () => {
    const required = ["name", "price", "details", "material", "purity", "quality"];
    for (const key of required) {
      if (!form[key] || String(form[key]).trim() === "") {
        alert(`Please fill the required field: ${key}`);
        return;
      }
    }
    if (!mainCategory || !subCategory || !genderCategory) {
        alert("Please select all category levels.");
        return;
    }
    if (!form.id && !mainImageFile) {
        alert("Main image is required for a new ornament.");
        return;
    }
    setShowPriceBreakup(true);
  };

  const handleFinalSave = async () => {
    if (form.priceBreakups.length === 0) {
      alert("Price breakup is required.");
      return;
    }

    const data: OrnamentApiData = {
      name: form.name,
      price: parseFloat(form.price),
      category: mainCategory,
      subCategory: subCategory,
      gender: genderCategory,
      description1: form.description1,
      description2: form.description2,
      description3: form.description3,
      description: form.description,
      material: form.material,
      purity: form.purity,
      quality: form.quality,
      details: form.details,
      priceBreakups: form.priceBreakups.map((p: any) => ({
          component: p.component,
          goldRate18kt: parseFloat(p.goldRate18kt),
          weightG: parseFloat(p.weightG),
          discount: parseFloat(p.discount),
          finalValue: parseFloat(p.finalValue)
      }))
    };
    
    const filteredSubImages = subImageFiles.filter(f => f) as File[];

    try {
        if (form.id) {
            await dispatch(updateOrnament({ id: form.id, data, mainImage: mainImageFile, subImages: filteredSubImages })).unwrap();
            alert("Ornament updated successfully!");
        } else {
            if (!mainImageFile) { alert("Main image is required."); return; }
            await dispatch(addOrnament({ data, mainImage: mainImageFile, subImages: filteredSubImages })).unwrap();
            alert("Ornament added successfully!");
        }
        resetAndHideForm();
        dispatch(fetchAllOrnaments({ page: currentPage, size: pageSize }));
    } catch (err: any) {
        alert(`Error: ${err}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      try {
        await dispatch(deleteOrnament(id)).unwrap();
        alert("Ornament deleted.");
        dispatch(fetchAllOrnaments({ page: currentPage, size: pageSize }));
      } catch (err) {
        alert(`Error: ${err}`);
      }
    }
  };

 
  const handleBreakupChange = (e: React.ChangeEvent<HTMLInputElement>) => setBreakupForm({ ...breakupForm, [e.target.name]: e.target.value });
  const handleBreakupSave = () => {
    const required = ["component", "goldRate18kt", "weightG", "discount", "finalValue"];
    for (const key of required) {
        if (!breakupForm[key] || String(breakupForm[key]).trim() === "") {
            alert(`Please fill all breakup fields.`);
            return;
        }
    }
    if (editingBreakupIdx !== null) {
      setForm((f: any) => ({ ...f, priceBreakups: f.priceBreakups.map((r: any, i: number) => i === editingBreakupIdx ? breakupForm : r) }));
    } else {
      setForm((f: any) => ({ ...f, priceBreakups: [...f.priceBreakups, breakupForm] }));
    }
    setBreakupForm(emptyBreakup);
    setEditingBreakupIdx(null);
  };
  const handleBreakupEdit = (idx: number) => { setEditingBreakupIdx(idx); setBreakupForm(form.priceBreakups[idx]); };
  const handleBreakupDelete = (idx: number) => setForm((f: any) => ({ ...f, priceBreakups: f.priceBreakups.filter((_: any, i: number) => i !== idx) }));
  const handleBreakupCancel = () => { setEditingBreakupIdx(null); setBreakupForm(emptyBreakup); };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      dispatch(setCurrentPage(newPage));
    }
  };

  const subCategoryOptions = mainCategory ? CATEGORY_TREE.find(cat => cat.name === mainCategory)?.children || [] : [];
 
  const genderCategoryOptions = subCategory ? subCategoryOptions.filter(sub => sub.name === subCategory) : [];
  const itemOptions = genderCategory && subCategory !== "Gold Coin" ? 
    (genderCategoryOptions.find(g => g.name === genderCategory) as any)?.items || []
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white p-2 sm:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#7a1335]">Manage Ornaments</h1>
        {!isFormVisible && (
          <button onClick={handleAddNew} className="bg-[#7a1335] text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-[#a31d4b] transition">
            + Add Ornament
          </button>
        )}
      </div>

      {isFormVisible && (
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">{form.id ? 'Edit Ornament' : 'Create New Ornament'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Image, Title, Price, Categories */}
            <div>
              <div className="mb-4">
                <label className="block font-semibold text-[#7a1335] mb-2">Main Image *</label>
                <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-[#7a1335] rounded-lg bg-[#fbeaf0]">
                  {imagePreviews.main && <img src={imagePreviews.main} alt="Main Preview" className="w-32 h-32 object-contain rounded-lg shadow" />}
                  <label className="w-full flex flex-col items-center">
                    <input type="file" name="mainImage" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <button type="button" className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-bold py-2 px-6 rounded-lg shadow transition mt-2 flex items-center gap-2" onClick={e => (e.currentTarget.previousElementSibling as HTMLInputElement)?.click()}>
                        Upload main image
                    </button>
                  </label>
                </div>
              </div>
              <input type="text" name="name" placeholder="Name *" value={form.name} onChange={handleChange} className="mb-3 px-3 py-2 border rounded w-full" required />
              <input type="number" name="price" placeholder="Price *" value={form.price} onChange={handleChange} className="mb-3 px-3 py-2 border rounded w-full" required />
              <div className="mb-3 flex flex-col gap-3 bg-[#fbeaf0] p-4 rounded-lg shadow-inner">
                <select name="mainCategory" value={mainCategory} onChange={e => { setMainCategory(e.target.value); setSubCategory(""); setGenderCategory(""); }} className="px-3 py-2 border rounded w-full" required>
                  <option value="">Select Main Category *</option>
                  {CATEGORY_TREE.map(cat => (<option key={cat.name} value={cat.name}>{cat.name}</option>))}
                </select>
                {subCategoryOptions.length > 0 && <select name="subCategory" value={subCategory} onChange={e => { setSubCategory(e.target.value); setGenderCategory(""); }} className="px-3 py-2 border rounded w-full mt-2" required>
                  <option value="">Select Sub-Category *</option>
                  {subCategoryOptions.map(sub => (<option key={sub.name} value={sub.name}>{sub.name}</option>))}
                </select>}
                {subCategory && <select name="genderCategory" value={genderCategory} onChange={e => setGenderCategory(e.target.value)} className="px-3 py-2 border rounded w-full mt-2" required>
                  <option value="">Select Gender/Type *</option>
                  {genderCategoryOptions.map(g => (<option key={g.name} value={g.name}>{g.name}</option>))}
                </select>}
              </div>
            </div>
            
            {/* Column 2: Material, Purity, Quality, Descriptions */}
            <div>
              <input type="text" name="material" placeholder="Material *" value={form.material} onChange={handleChange} className="mb-3 px-3 py-2 border rounded w-full" required />
              <input type="text" name="purity" placeholder="Gold Purity *" value={form.purity} onChange={handleChange} className="mb-3 px-3 py-2 border rounded w-full" required />
              <input type="text" name="quality" placeholder="Quality *" value={form.quality} onChange={handleChange} className="mb-3 px-3 py-2 border rounded w-full" required />
              <input type="text" name="details" placeholder="Details *" value={form.details} onChange={handleChange} className="mb-3 px-3 py-2 border rounded w-full" required />
              <input type="text" name="description" placeholder="Description Title *" value={form.description} onChange={handleChange} className="mb-3 px-3 py-2 border rounded w-full" required />
              <input type="text" name="description1" placeholder="Description Point 1 *" value={form.description1} onChange={handleChange} className="mb-3 px-3 py-2 border rounded w-full" required />
              <input type="text" name="description2" placeholder="Description Point 2 *" value={form.description2} onChange={handleChange} className="mb-3 px-3 py-2 border rounded w-full" required />
              <input type="text" name="description3" placeholder="Description Point 3 *" value={form.description3} onChange={handleChange} className="mb-3 px-3 py-2 border rounded w-full" required />
            </div>

            {/* Column 3: Gallery Images */}
            <div>
              <label className="block font-semibold text-[#7a1335] mb-2">Gallery Images</label>
              <div className="grid grid-cols-2 gap-4">
                {subImageFiles.map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-3 border rounded-lg bg-[#fbeaf0]">
                    {imagePreviews.subs[i] && <img src={imagePreviews.subs[i]} alt={`Sub ${i}`} className="w-20 h-20 object-contain rounded border mb-2" />}
                    <label className="w-full flex flex-col items-center">
                        <input type="file" name={`subImage${i}`} accept="image/*" onChange={(e) => handleFileChange(e, i)} className="hidden" />
                        <button type="button" className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-1 px-4 rounded transition mt-2" onClick={e => (e.currentTarget.previousElementSibling as HTMLInputElement)?.click()}>Upload</button>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!showPriceBreakup ? (
            <div className="flex gap-4 mt-8">
              <button onClick={handleProductFormSave} className="bg-[#7a1335] text-white font-semibold py-2 px-6 rounded hover:bg-[#a31d4b]">Next</button>
              <button onClick={resetAndHideForm} className="bg-gray-400 text-white font-semibold py-2 px-6 rounded hover:bg-gray-500">Cancel</button>
            </div>
          ) : (
            <div className="mt-10 border-t pt-8">
              <h3 className="text-xl font-bold text-[#7a1335] mb-4">Price Breakup</h3>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-[#7a1335]">Component</th>
                      <th className="px-4 py-2 text-left text-[#7a1335]">Gold Rate (18KT)</th>
                      <th className="px-4 py-2 text-left text-[#7a1335]">Weight (g)</th>
                      <th className="px-4 py-2 text-left text-[#7a1335]">Discount</th>
                      <th className="px-4 py-2 text-left text-[#7a1335]">Final Value</th>
                      <th className="px-4 py-2 text-left text-[#7a1335]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.priceBreakups.map((row: any, i: number) => (
                      <tr key={i} className="border-b">
                        <td className="px-4 py-2">{row.component}</td>
                        <td className="px-4 py-2">₹{row.goldRate18kt}</td>
                        <td className="px-4 py-2">{row.weightG}g</td>
                        <td className="px-4 py-2">₹{row.discount}</td>
                        <td className="px-4 py-2">₹{row.finalValue}</td>
                        <td className="px-4 py-2 flex gap-2">
                          <button onClick={() => handleBreakupEdit(i)} className="bg-blue-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                          <button onClick={() => handleBreakupDelete(i)} className="bg-red-500 text-white px-3 py-1 rounded text-xs">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <input type="text" name="component" placeholder="Component *" value={breakupForm.component} onChange={handleBreakupChange} className="px-2 py-1 border rounded" />
                <input type="number" name="goldRate18kt" placeholder="Gold Rate *" value={breakupForm.goldRate18kt} onChange={handleBreakupChange} className="px-2 py-1 border rounded" />
                <input type="number" name="weightG" placeholder="Weight (g) *" value={breakupForm.weightG} onChange={handleBreakupChange} className="px-2 py-1 border rounded" />
                <input type="number" name="discount" placeholder="Discount *" value={breakupForm.discount} onChange={handleBreakupChange} className="px-2 py-1 border rounded" />
                <input type="number" name="finalValue" placeholder="Final Value *" value={breakupForm.finalValue} onChange={handleBreakupChange} className="px-2 py-1 border rounded" />
              </div>
              <div className="flex gap-4">
                <button onClick={handleBreakupSave} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded">{editingBreakupIdx !== null ? 'Update Row' : 'Add Row'}</button>
                {editingBreakupIdx !== null && <button onClick={handleBreakupCancel} className="bg-gray-400 text-white font-semibold py-2 px-4 rounded">Cancel Edit</button>}
              </div>
              <div className="flex gap-4 mt-8 border-t pt-6">
                <button onClick={handleFinalSave} disabled={status === 'loading'} className="bg-green-600 text-white font-semibold py-2 px-8 rounded disabled:bg-gray-400">{status === 'loading' ? 'Saving...' : (form.id ? 'Update Product' : 'Save Product')}</button>
                <button onClick={() => setShowPriceBreakup(false)} className="bg-gray-500 text-white font-semibold py-2 px-6 rounded">Back</button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-8 mt-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Existing Ornaments</h2>
        {status === 'loading' && !ornaments.length && <p>Loading ornaments...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="space-y-4">
          {ornaments.map((product) => (
            <div key={product.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <img src={product.mainImage} alt={product.name} className="w-20 h-20 object-cover rounded-md"/>
              <p className="font-bold text-lg col-span-2 text-[#7a1335]">{product.name}</p>
              <p className="text-gray-600 text-sm">{product.category} {">"} {product.subCategory} {">"} {product.gender}</p>
              <div className="flex gap-2 justify-end">
                <button onClick={() => handleEdit(product)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(product.id)} disabled={status === 'loading'} className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 disabled:bg-gray-400">Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-8 gap-2">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0 || status === 'loading'} className="px-4 py-2 bg-[#7a1335] text-white rounded disabled:bg-gray-300">Prev</button>
          <span className="font-semibold">Page {currentPage + 1} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1 || status === 'loading'} className="px-4 py-2 bg-[#7a1335] text-white rounded disabled:bg-gray-300">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ManageOrnaments;