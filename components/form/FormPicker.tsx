'use client';

import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedImageId, setImageId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });

        if (result && result.response) {
          const responseImages = result.response as Array<Record<string, any>>;
          setImages(responseImages);
        } else {
          console.error('Failed to get images from Unsplash API');
        }
      } catch (err) {
        console.error(err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    })();

    // fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader className="h-6 w-6 text-teal-600 animate-spin" />
      </div>
    );
  }

  return <div className='relative grid gird-cols-3 gap-2 mb-2'>
        {
            images.map(image => (
                <div key={image.id} className={cn("cursor-pointer aspect-video group hover:opacity-75 transition bg-muted",pending && "opacity-50 hover:opacity-50 cursor-auto" )}>
                    
                </div>
            ))
        }

  </div>;
};

export default FormPicker;
