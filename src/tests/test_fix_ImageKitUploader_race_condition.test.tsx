import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import ImageKitUploader from '@/components/ImageKitUploader';
import { ToastProvider } from '@/components/Toast';

// Mock the ImageKit constructor
const mockUpload = jest.fn().mockResolvedValue({ url: 'https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIOJONES_HERO_IMAGE_03.svg?tr=q-90', name: 'chucknorris.png' });
const mockImageKit = jest.fn(() => ({
  upload: mockUpload,
}));

describe('ImageKitUploader', () => {

  afterEach(() => {
    // Clean up the mock after each test
    // @ts-ignore
    delete window.ImageKit;
    mockUpload.mockClear();
    mockImageKit.mockClear();
  });

  it('should not upload if the SDK is not ready', async () => {
    // Ensure window.ImageKit is not defined for this test
    // @ts-ignore
    delete window.ImageKit;

    render(
      <ToastProvider>
        <ImageKitUploader />
      </ToastProvider>
    );

    const uploadButton = screen.getByText(/upload/i);
    // The button should be disabled because the SDK is not loaded.
    expect(uploadButton).toBeDisabled();

    // Mock file selection
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByTestId('ik-file-input');
    fireEvent.change(input, { target: { files: [file] } });

    // fireEvent.click on a disabled button does not trigger the event handler.
    fireEvent.click(uploadButton);

    // Expect the upload function not to be called
    expect(mockUpload).not.toHaveBeenCalled();
  });

  it('should upload when the SDK is ready', async () => {
    // Set up the mock SDK *before* rendering for this test
    Object.defineProperty(window, 'ImageKit', {
      value: mockImageKit,
      writable: true,
      configurable: true,
    });

    render(
      <ToastProvider>
        <ImageKitUploader />
      </ToastProvider>
    );

    const uploadButton = screen.getByText(/upload/i);
    // Wait for the button to become enabled
    await waitFor(() => {
      expect(uploadButton).toBeEnabled();
    });

    // Mock file selection
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByTestId('ik-file-input');
    fireEvent.change(input, { target: { files: [file] } });

    // Click the upload button
    await act(async () => {
      fireEvent.click(uploadButton);
    });

    // Expect the upload function to have been called
    expect(mockUpload).toHaveBeenCalled();
  });
});
