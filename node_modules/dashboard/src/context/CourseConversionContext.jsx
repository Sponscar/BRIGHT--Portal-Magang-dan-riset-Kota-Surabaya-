import { createContext, useContext, useState, useEffect } from 'react';

const CourseConversionContext = createContext(null);

export const CourseConversionProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('brida_course_conversion');
        if (saved) {
            try {
                setCourses(JSON.parse(saved));
            } catch {
                setCourses([]);
            }
        }
    }, []);

    // Persist to localStorage on change
    useEffect(() => {
        localStorage.setItem('brida_course_conversion', JSON.stringify(courses));
    }, [courses]);

    const setCourseList = (courseList) => {
        setCourses(courseList);
    };

    const addCourse = (course) => {
        if (course && !courses.includes(course)) {
            setCourses(prev => [...prev, course]);
        }
    };

    const removeCourse = (course) => {
        setCourses(prev => prev.filter(c => c !== course));
    };

    return (
        <CourseConversionContext.Provider value={{ courses, setCourseList, addCourse, removeCourse }}>
            {children}
        </CourseConversionContext.Provider>
    );
};

export const useCourseConversion = () => {
    const context = useContext(CourseConversionContext);
    if (!context) {
        throw new Error('useCourseConversion must be used within a CourseConversionProvider');
    }
    return context;
};
