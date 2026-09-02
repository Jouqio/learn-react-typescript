/**
 * ============================================================================
 * TAHAP 5: PRAKTIK FETCH DATA DARI API DENGAN useEffect (PostListFetcher.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN:
 * 1. Menggunakan `useEffect` dengan dependency array `[]` untuk memuat data awal saat mount.
 * 2. Mengelola 3 status umum data fetching:
 *    - Loading State : Sedang mengambil data dari internet
 *    - Error State   : Gagal koneksi / terjadi error
 *    - Success State : Data berhasil didapat dan siap ditampilkan
 * 3. Memberikan kontrak tipe data (Interface) pada respon API publik (JSONPlaceholder).
 */

import { useState, useEffect } from "react";
import { Globe, RotateCw, Loader2, AlertCircle, FileText } from "lucide-react";

// 1. Interface Response API (Type Contract)
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// 2. Konstanta Endpoint API Publik (Clean Code)
const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=3";

export function PostListFetcher() {
  // State data artikel (array of Post)
  const [posts, setPosts] = useState<Post[]>([]);

  // State indikator loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State pesan error jika fetch gagal
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // State pemicu refetch (angka acak/timestamp)
  const [fetchTrigger, setFetchTrigger] = useState<number>(0);

  // Fungsi fetch data yang bersih dan aman
  const fetchPosts = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      // Typing hasil parsing JSON dengan interface Post[]
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Terjadi kesalahan tidak dikenal";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect: Dijalankan saat pertama kali komponen muncul (mount)
  // dan setiap kali nilai `fetchTrigger` berubah
  useEffect(() => {
    fetchPosts();
  }, [fetchTrigger]);

  // Handler tombol muat ulang data
  const handleRefresh = () => {
    setFetchTrigger((prev) => prev + 1);
  };

  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <Globe size={14} />
          Tahap 5: Praktik API Fetching
        </div>
      </div>

      <div className="fetcher-header">
        <div>
          <h2 className="card-title">Data dari API Publik (JSONPlaceholder)</h2>
          <p className="card-subtitle">
            Mengambil data postingan secara asinkron menggunakan <code>fetch()</code> di dalam <code>useEffect</code>
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isLoading}
          className="btn-refresh"
        >
          {isLoading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>Memuat...</span>
            </>
          ) : (
            <>
              <RotateCw size={13} />
              <span>Refresh Data</span>
            </>
          )}
        </button>
      </div>

      {/* Kondisi 1: Sedang Loading */}
      {isLoading && (
        <div className="loading-state-box">
          <Loader2 size={24} className="animate-spin" style={{ color: "var(--accent)" }} />
          <p>Sedang menghubungi server JSONPlaceholder...</p>
        </div>
      )}

      {/* Kondisi 2: Terjadi Error */}
      {!isLoading && errorMessage && (
        <div className="error-badge">
          <AlertCircle size={14} />
          <span>Gagal Mengambil Data: {errorMessage}</span>
        </div>
      )}

      {/* Kondisi 3: Sukses & Menampilkan Data */}
      {!isLoading && !errorMessage && posts.length > 0 && (
        <div className="post-list-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-item-card">
              <div className="post-item-header">
                <span className="post-id-badge">#{post.id}</span>
                <span className="post-author">Author ID: {post.userId}</span>
              </div>
              <h4 className="post-title">
                <FileText size={14} style={{ display: "inline", marginRight: "6px", verticalAlign: "text-bottom" }} />
                {post.title}
              </h4>
              <p className="post-body">{post.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
