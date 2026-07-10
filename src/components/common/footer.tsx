import {FolderGit2, Heart, Mail,  Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" border-t bg-[#f3e5f5]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 justify-items-end">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-violet-700" size={28} />

              <h2 className=" font-bold text-violet-700 text-2xl">HerMap</h2>
            </div>

            <p className="mt-4 text-gray-600 leading-7">
              Community-powered accessibility insights helping women discover
              safer, cleaner and more inclusive public spaces.
            </p>
          </div>



          {/* Contact */}

          <div>
            <h3 className="font-semibold text-lg">Connect</h3>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <FolderGit2 size={18} />

                <a href="https://github.com/pixel-angel/Project_Athena-v2v" className="pointer-cursor">GitHub Repository</a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />

                <pre>
                  Anju Sinha
                  Kashish
                  Alisha Singh
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex justify-between text-sm text-gray-500">
          <p>© 2026 SheMap. All rights reserved.</p>

          <p className="flex items-center gap-2">
            Made with
            <Heart size={16} className="text-pink-500 fill-pink-500" />
            for IEEE SHE Aspire
          </p>
        </div>
      </div>
    </footer>
  );
}
