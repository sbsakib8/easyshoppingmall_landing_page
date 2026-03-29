"use client";

import { useState, useEffect } from "react";
import { getProducts, addProduct, deleteProduct, updateProduct } from "@/action/product";
import Swal from "sweetalert2";
import Image from "next/image";
import { Trash2, Pencil } from "lucide-react";

export default function FeaturedProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setIsLoading(true);
    const data = await getProducts();
    if (data) {
      setProducts(data);
    }
    setIsLoading(false);
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const productData = {
      name,
      description,
      price: Number(price),
      oldPrice: Number(oldPrice),
      discount: Number(discount),
      image
    };

    let result;
    if (editingId) {
      result = await updateProduct(editingId, productData);
    } else {
      result = await addProduct(productData);
    }

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: editingId ? "Updated" : "Added",
        text: result.message,
        background: "#11151c",
        color: "#fff",
      });
      // Reset form
      setEditingId(null);
      setName("");
      setDescription("");
      setPrice("");
      setOldPrice("");
      setDiscount("");
      setImage("");
      // Reload products
      await loadProducts();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message,
        background: "#11151c",
        color: "#fff",
      });
    }
    setIsSaving(false);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name || "");
    setDescription(product.description || "");
    setPrice(product.price || "");
    setOldPrice(product.oldPrice || "");
    setDiscount(product.discount || "");
    setImage(product.image || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("");
    setOldPrice("");
    setDiscount("");
    setImage("");
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#11151c",
      color: "#fff",
    });

    if (confirm.isConfirmed) {
      const result = await deleteProduct(id);
      if (result.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Product has been deleted.",
          icon: "success",
          background: "#11151c",
          color: "#fff",
        });
        await loadProducts();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete product.",
          background: "#11151c",
          color: "#fff",
        });
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12">
      {/* ADD/EDIT PRODUCT FORM */}
      <div className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-accent-content mb-6">
          {editingId ? "Edit Featured Product" : "Add Featured Product"}
        </h1>

        <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color"
              placeholder="E.g. Royal Oxford Timepiece"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color"
              placeholder="Short description of the product..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Price (৳)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color"
              placeholder="E.g. 15000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Old Price (৳)</label>
            <input
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className="w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color"
              placeholder="E.g. 25000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color"
              placeholder="E.g. 40"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-[#080808] border border-accent-content/10 rounded-xl px-4 py-3 text-accent-content placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color"
              placeholder="https://example.com/watch.jpg"
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-2 gap-4">
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                disabled={isSaving}
                className={`px-8 py-3 bg-gray-600 hover:bg-gray-500 text-accent-content font-bold rounded-xl transition-all shadow-lg ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className={`px-8 py-3 bg-primary-color hover:bg-accent-content text-black font-bold rounded-xl transition-all shadow-lg ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
            >
              {isSaving ? "Saving..." : (editingId ? "Update Product" : "Add Product")}
            </button>
          </div>
        </form>
      </div>

      {/* EXISTING PRODUCTS LIST */}
      <div className="bg-[#11151c] rounded-2xl shadow-xl border border-accent-content/5 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-accent-content mb-6">Manage Existing Products</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No featured products found.</p>
        ) : (
          <div className="space-y-4">
            {products?.map((product) => (
              <div key={product._id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#080808] border border-accent-content/5 rounded-xl gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Tiny Image Preview */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="text-accent-content font-bold">{product.name}</h3>
                    <p className="text-gray-500 text-sm">৳{product.price} <span className="line-through ml-2 text-gray-600">৳{product.oldPrice}</span></p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                    title="Edit Product"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    title="Delete Product"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
