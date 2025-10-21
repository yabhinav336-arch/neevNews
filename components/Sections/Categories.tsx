
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  { id: '1', name: 'India', slug: 'india', color: 'bg-blue-500' },
  { id: '2', name: 'Business', slug: 'business', color: 'bg-green-500' },
  { id: '3', name: 'Entertainment', slug: 'entertainment', color: 'bg-yellow-500' },
  { id: '4', name: 'World', slug: 'world', color: 'bg-red-500' },
  { id: '5', name: 'Technology', slug: 'technology', color: 'bg-purple-500' },
  { id: '6', name: 'Science', slug: 'science', color: 'bg-indigo-500' },
];

const Categories: React.FC = () => {
  return (
    <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4 font-serif">
            Explore News Categories
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto text-lg">
            Discover stories that matter to you across our comprehensive range of news categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group"
            >
              <div className="card-hover p-6 md:p-8 text-center min-h-[140px] md:min-h-[160px] flex flex-col justify-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                  <div className={`w-full h-full ${category.color} transform rotate-12 scale-150`}></div>
                </div>
                
                {/* Category Icon/Number */}
                <div className={`w-12 h-12 md:w-16 md:h-16 ${category.color} rounded-xl mx-auto mb-4 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white font-bold text-lg md:text-xl">
                    {category.name.charAt(0)}
                  </span>
                </div>

                {/* Category Name */}
                <h3 className="text-lg md:text-xl font-semibold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 relative z-10">
                  {category.name}
                </h3>

                {/* Article Count */}
                <p className="text-sm text-secondary-500 dark:text-secondary-500 relative z-10">
                  {20 + (index * 7) + 15} articles
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center btn-primary px-8 py-4 text-lg"
          >
            Browse All Categories
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
