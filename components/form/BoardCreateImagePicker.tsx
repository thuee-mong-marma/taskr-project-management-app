'use client';

import { defaultUnsplashImages } from '@/constants/unsplashImages';
import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import { Check, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { FormError } from './FormError';

interface BoardCreateImagePickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const BoardCreateImagePicker = ({
  id,
  errors,
}: BoardCreateImagePickerProps) => {
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
        setImages(defaultUnsplashImages);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader className="h-6 w-6 text-teal-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-3 gap-2 mb-2">
      {images.map((image) => (
        <div
          key={image.id}
          className={cn(
            'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
            pending && 'opacity-50 hover:opacity-50 cursor-auto'
          )}
          onClick={() => {
            if (pending) return;
            // console.log('id', image.id);
            setImageId(image.id);
          }}
        >
          <input
            type="radio"
            className="hidden"
            checked={selectedImageId === image.id}
            id={id}
            name={id}
            disabled={pending}
            value={`${image.id}|${image.user.name}|${image.urls.thumb}|${image.urls.full}|${image.links.html}`}
          />
          {selectedImageId === image.id && (
            <div className="absolute inset-y-0 h-full w-full flex items-center justify-center bg-black/30 z-[9]">
              <Check className="h-6 w-6 text-white" />
            </div>
          )}
          <Image
            src={image.urls.thumb}
            fill
            alt="unsplash image"
            className="object-cover rounded-sm"
          />
          <Link
            href={image.links.html}
            target="_blank"
            className="w-full opacity-0 group-hover:opacity-100 absolute bottom-0 text-[10px] truncate text-white hover:underline p-1 bg-black/50"
          >
            {image.user.name}
          </Link>
        </div>
      ))}
      <FormError id="image" error={errors} />
    </div>
  );
};

export default BoardCreateImagePicker;
