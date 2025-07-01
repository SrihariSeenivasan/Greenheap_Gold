import { useState } from "react";
import { products as initialProducts } from "../../../../constants";


const emptyProduct = {
  img: "",
  title: "",
  price: "",
  details: "",
  material: "",
  goldpurity: "",
  quality: "",
  description: { title: "", points: ["", "", ""] },
  img1: "",
  img2: "",
  img3: "",
  img4: "",
  pricebreakup: [] // <-- add this
};

const emptyBreakup = {
  component: "",
  goldrate18kt: "",
  weightg: "",
  discount: "",
  finalvalue: ""
};

const B2BManageOrnaments = () => {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [form, setForm] = useState<any>(emptyProduct);

  // Remove global pricebreakup state
  // const [pricebreakup, setPricebreakup] = useState<any[]>(initialPricebreakup);
  const [breakupForm, setBreakupForm] = useState<any>(emptyBreakup);
  const [editingBreakupIdx, setEditingBreakupIdx] = useState<number | null>(null);

  // Popup state
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showProductDeleted, setShowProductDeleted] = useState(false);
  const [showPriceBreakupRequired, setShowPriceBreakupRequired] = useState(false);
  const [showProductAdded, setShowProductAdded] = useState(false);

  // Product Handlers
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name.startsWith("descpoint")) {
      const idx = Number(name.replace("descpoint", ""));
      setForm((f: any) => ({
        ...f,
        description: {
          ...f.description,
          points: f.description.points.map((p: string, i: number) =>
            i === idx ? value : p
          ),
        },
      }));
    } else if (name === "descriptionTitle") {
      setForm((f: any) => ({
        ...f,
        description: { ...f.description, title: value },
      }));
    } else {
      setForm((f: any) => ({ ...f, [name]: value }));
    }
  };

  const handleFile = (e: any) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setForm((f: any) => ({ ...f, [name]: url }));
    }
  };

  // Track if product form is submitted and price breakup should be shown
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);

  // Modified handleSave: after product form, show price breakup form
  const handleProductFormSave = () => {
    const required = [
      "img", "img1", "img2", "title", "price", "details", "material", "goldpurity", "quality"
    ];
    for (const key of required) {
      if (!form[key] || (typeof form[key] === "string" && form[key].trim() === "")) {
        alert(`Please fill the required field: ${key}`);
        return;
      }
    }
    if (
      !form.description.title ||
      form.description.points.some((p: string) => !p.trim())
    ) {
      alert("Please fill all description fields.");
      return;
    }
    setShowPriceBreakup(true);
  };

  // Final save: add product with price breakup
  const handleFinalSave = () => {
    if (!form.pricebreakup || form.pricebreakup.length === 0) {
      setShowPriceBreakupRequired(true);
      return;
    }
    if (editingIdx !== null) {
      setProducts((prods) =>
        prods.map((p, i) => (i === editingIdx ? form : p))
      );
      setEditingIdx(null);
    } else {
      setProducts((prods) => [...prods, form]);
    }
    setForm(emptyProduct);
    setShowPriceBreakup(false);
    setBreakupForm(emptyBreakup);
    setEditingBreakupIdx(null);
    setShowProductAdded(true);
  };

  const handleDelete = (idx: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prods) => prods.filter((_, i) => i !== idx));
      if (editingIdx === idx) {
        setEditingIdx(null);
        setForm(emptyProduct);
        setShowPriceBreakup(false);
        setBreakupForm(emptyBreakup);
        setEditingBreakupIdx(null);
      }
      setShowProductDeleted(true); // Show ProductDeletedPopup after deletion
    }
  };

  // Price Breakup Handlers (now operate on form.pricebreakup)
  const handleBreakupChange = (e: any) => {
    const { name, value } = e.target;
    setBreakupForm((f: any) => ({ ...f, [name]: value }));
  };

  const handleBreakupSave = () => {
    const required = ["component", "goldrate18kt", "weightg", "discount", "finalvalue"];
    for (const key of required) {
      if (!breakupForm[key] || (typeof breakupForm[key] === "string" && breakupForm[key].trim() === "")) {
        alert(`Please fill the required field: ${key}`);
        return;
      }
    }
    if (editingBreakupIdx !== null) {
      setForm((f: any) => ({
        ...f,
        pricebreakup: f.pricebreakup.map((row: any, i: number) =>
          i === editingBreakupIdx ? breakupForm : row
        ),
      }));
      setEditingBreakupIdx(null);
    } else {
      setForm((f: any) => ({
        ...f,
        pricebreakup: [...(f.pricebreakup || []), breakupForm],
      }));
    }
    setBreakupForm(emptyBreakup);
  };

  const handleBreakupEdit = (idx: number) => {
    setEditingBreakupIdx(idx);
    setBreakupForm(form.pricebreakup[idx]);
  };

  const handleBreakupDelete = (idx: number) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      setForm((f: any) => ({
        ...f,
        pricebreakup: f.pricebreakup.filter((_: any, i: number) => i !== idx),
      }));
      if (editingBreakupIdx === idx) {
        setEditingBreakupIdx(null);
        setBreakupForm(emptyBreakup);
      }
    }
  };

  const handleBreakupCancel = () => {
    setEditingBreakupIdx(null);
    setBreakupForm(emptyBreakup);
  };

  const handleEdit = (idx: number) => {
    setEditingIdx(idx);
    setForm(products[idx]);
    setShowPriceBreakup(false);
    setBreakupForm(emptyBreakup);
    setEditingBreakupIdx(null);
  };

    function handleCancelAll(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setForm(emptyProduct);
        setEditingIdx(null);
        setShowPriceBreakup(false);
        setBreakupForm(emptyBreakup);
        setEditingBreakupIdx(null);
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white p-2 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#7a1335] mb-4 sm:mb-8">Manage Ornaments</h1>
      {/* Product Form Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 mb-6 sm:mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {/* First Card: Image, Title, Price */}
          <div>
            <div className="mb-4">
              <label className="block font-semibold text-[#7a1335] mb-2">Main Image *</label>
              <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-[#7a1335] rounded-lg bg-[#fbeaf0]">
                {form.img && <img src={form.img} alt="Main" className="w-32 h-32 object-contain rounded-lg shadow" />}
                {/* Custom upload button below the image */}
                <label className="w-full flex flex-col items-center">
                  <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                    required
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
            <input
              type="text"
              name="title"
              placeholder="Title *"
              value={form.title}
              onChange={handleChange}
              className="mb-3 px-3 py-2 border rounded w-full"
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price *"
              value={form.price}
              onChange={handleChange}
              className="mb-3 px-3 py-2 border rounded w-full"
              required
            />
          </div>
          {/* Second Card: Material, Purity, Quality, Description */}
          <div>
            <input
              type="text"
              name="material"
              placeholder="Material *"
              value={form.material}
              onChange={handleChange}
              className="mb-3 px-3 py-2 border rounded w-full"
              required
            />
            <input
              type="text"
              name="goldpurity"
              placeholder="Gold Purity *"
              value={form.goldpurity}
              onChange={handleChange}
              className="mb-3 px-3 py-2 border rounded w-full"
              required
            />
            <input
              type="text"
              name="quality"
              placeholder="Quality *"
              value={form.quality}
              onChange={handleChange}
              className="mb-3 px-3 py-2 border rounded w-full"
              required
            />
            <input
              type="text"
              name="details"
              placeholder="Details *"
              value={form.details}
              onChange={handleChange}
              className="mb-3 px-3 py-2 border rounded w-full"
              required
            />
            <input
              type="text"
              name="descriptionTitle"
              placeholder="Description Title *"
              value={form.description.title}
              onChange={handleChange}
              className="mb-3 px-3 py-2 border rounded w-full"
              required
            />
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                type="text"
                name={`descpoint${i}`}
                placeholder={`Description Point ${i + 1} *`}
                value={form.description.points[i]}
                onChange={handleChange}
                className="mb-3 px-3 py-2 border rounded w-full"
                required
              />
            ))}
          </div>
          {/* Third Card: img1, img2, img3, img4 */}
          <div>
            <label className="block font-semibold text-[#7a1335] mb-2">Product Gallery Images</label>
            <div className="grid grid-cols-2 gap-4">
              {["img1", "img2", "img3", "img4"].map((imgKey, i) => (
                <div key={imgKey} className="flex flex-col items-center gap-2 p-3 border rounded-lg bg-[#fbeaf0]">
                  {/* Show image preview above */}
                  {form[imgKey] && (
                    <img src={form[imgKey]} alt={imgKey} className="w-20 h-20 object-contain rounded border mb-2" />
                  )}
                  {/* Custom upload button below the image */}
                  <label className="w-full flex flex-col items-center">
                    <input
                      type="file"
                      name={imgKey}
                      accept="image/*"
                      onChange={handleFile}
                      className="hidden"
                      required={i < 2}
                    />
                    <button
                      type="button"
                      className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-1 px-4 rounded transition mt-2"
                      onClick={e => {
                        // Find the input inside the label and trigger click
                        const input = (e.currentTarget.parentElement?.querySelector('input[type="file"]') as HTMLInputElement | null);
                        input?.click();
                      }}
                    >
                      Upload
                    </button>
                  </label>
                  <span className="text-xs text-gray-500">{imgKey}{i < 2 ? " *" : " (optional)"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        {!showPriceBreakup ? (
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
            <button
              className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 px-6 rounded transition"
              onClick={handleProductFormSave}
            >
              {editingIdx !== null ? "Next" : "Add Product"}
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded transition"
              onClick={handleCancelAll}
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            {/* Price Breakup Editable Card (now inside Product Form Card) */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 mt-6 sm:mt-10">
              <h2 className="text-lg sm:text-xl font-bold text-[#7a1335] mb-2 sm:mb-4">Price Breakup (Editable)</h2>
              <div className="overflow-x-auto mb-4 sm:mb-6">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-[#7a1335]">Component</th>
                      <th className="px-4 py-2 text-[#7a1335]">Gold Rate (18KT)</th>
                      <th className="px-4 py-2 text-[#7a1335]">Weight (g)</th>
                      <th className="px-4 py-2 text-[#7a1335]">Discount</th>
                      <th className="px-4 py-2 text-[#7a1335]">Final Value</th>
                      <th className="px-4 py-2 text-[#7a1335]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(form.pricebreakup || []).map((row: any, i: number) => (
                      <tr key={i} className="border-b last:border-b-0">
                        <td className="px-4 py-3">{row.component}</td>
                        <td className="px-4 py-3">{row.goldrate18kt}</td>
                        <td className="px-4 py-3">{row.weightg}</td>
                        <td className="px-4 py-3">{row.discount}</td>
                        <td className="px-4 py-3">{row.finalvalue}</td>
                        <td className="px-4 py-3 space-x-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                            onClick={() => handleBreakupEdit(i)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                            onClick={() => handleBreakupDelete(i)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Price Breakup Form */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <input
                  type="text"
                  name="component"
                  placeholder="Component *"
                  value={breakupForm.component}
                  onChange={handleBreakupChange}
                  className="px-2 py-1 border rounded"
                  required
                />
                <input
                  type="text"
                  name="goldrate18kt"
                  placeholder="Gold Rate (18KT) *"
                  value={breakupForm.goldrate18kt}
                  onChange={handleBreakupChange}
                  className="px-2 py-1 border rounded"
                  required
                />
                <input
                  type="text"
                  name="weightg"
                  placeholder="Weight (g) *"
                  value={breakupForm.weightg}
                  onChange={handleBreakupChange}
                  className="px-2 py-1 border rounded"
                  required
                />
                <input
                  type="text"
                  name="discount"
                  placeholder="Discount *"
                  value={breakupForm.discount}
                  onChange={handleBreakupChange}
                  className="px-2 py-1 border rounded"
                  required
                />
                <input
                  type="text"
                  name="finalvalue"
                  placeholder="Final Value *"
                  value={breakupForm.finalvalue}
                  onChange={handleBreakupChange}
                  className="px-2 py-1 border rounded"
                  required
                />
              </div>
              <div className="flex gap-3">
                {editingBreakupIdx !== null ? (
                  <>
                    <button
                      className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 px-6 rounded transition"
                      onClick={handleBreakupSave}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded transition"
                      onClick={handleBreakupCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-[#7a1335] hover:bg-[#a31d4b] text-white font-semibold py-2 px-6 rounded transition"
                    onClick={handleBreakupSave}
                  >
                    Add Row
                  </button>
                )}
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
                  onClick={handleFinalSave}
                >
                  {editingIdx !== null ? "Save Product" : "Add Product"}
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded transition"
                  onClick={handleCancelAll}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Product List */}
      <div className="grid gap-4 sm:gap-8">
        {products.map((product, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* First Card: Image, Title, Price */}
            <div className="flex flex-col items-center border-r md:border-r-2 border-[#fbeaf0] pr-0 md:pr-6">
              <img src={product.img} alt={product.title} className="w-32 h-32 object-contain mb-4 rounded-lg shadow" />
              <h2 className="text-xl font-bold text-[#7a1335] mb-2">{product.title}</h2>
              <div className="text-[#7a1335] font-semibold text-lg">{product.price}</div>
            </div>
            {/* Second Card: Material, Purity, Quality, Description */}
            <div className="flex flex-col justify-center border-r md:border-r-2 border-[#fbeaf0] pr-0 md:pr-6">
              <div className="mb-2">
                <span className="font-semibold text-[#7a1335]">Material:</span> {product.material}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-[#7a1335]">Gold Purity:</span> {product.goldpurity}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-[#7a1335]">Quality:</span> {product.quality}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-[#7a1335]">Details:</span> {product.details}
              </div>
              <div className="mt-2">
                <div className="font-semibold text-[#7a1335]">{product.description.title}</div>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  {product.description.points.map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Third Card: img1, img2, img3, img4 */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="grid grid-cols-2 gap-2">
                {[product.img1, product.img2, product.img3, product.img4].map((img, i) => (
                  img ? (
                    <img
                      key={i}
                      src={img}
                      alt={`Product ${idx + 1} - View ${i + 1}`}
                      className="w-20 h-20 object-contain rounded border"
                    />
                  ) : null
                ))}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="col-span-1 md:col-span-3 flex flex-col sm:flex-row gap-3 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition"
                onClick={() => handleEdit(idx)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
                onClick={() => handleDelete(idx)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Popups */}
     
    </div>
  );
};

export default B2BManageOrnaments;

