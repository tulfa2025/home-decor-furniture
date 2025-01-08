import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

describe("Home Page", ()=>{
    it("Should render Navigation Banner", ()=>{
        
        render(<Home />);
        
        const subHeader = screen.getByRole('banner');

        expect(subHeader).toBeInTheDocument();
    });

    it("Should render the Banner component on first load", ()=>{

        render(<Home />);
        
        const banner = screen.getByTestId('tulfa-sofa-container');

        expect(banner).toBeInTheDocument();

    });

    /**
     * Page should only render the Banner component first, it should NOT render
     * the second component (Blogs), until the scrolling threshold is met.
     */
    it("Should not render Blogs component on first load", ()=>{
        
        render(<Home />);

        const Blogs = screen.getByTestId('tulfa-cta-primary-container');

        expect(Blogs).not.toBeInTheDocument();
    })
})