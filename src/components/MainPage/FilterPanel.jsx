import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './FilterPanel.css';
import CheckMark from '../../assets/svg/CheckMark';
import FilterIcon from '../../assets/svg/FilterIcon';
import ExportIcon from '../../assets/svg/ExportIcon';
import ClearCondition from '../../assets/svg/ClearCondition';
import filterFields from '../../assets/data/filterFields.json';


const FilterPanel = React.memo(() => {
    const [checkboxFilters, setCheckboxFilters] = useState({
        expiredContracts: false,
        willExpire: false,
        publicationDate: false,
        published: false
    });
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [filterConditions, setFilterConditions] = useState([{ field: '', value: '', startDate: '', endDate: '' }]);
    const [openSelect, setOpenSelect] = useState(null);
    const [advancedFiltersApplied, setAdvancedFiltersApplied] = useState([]);
    const [hasInteracted, setHasInteracted] = useState(false);

    const advancedFiltersRef = useRef(null);
    const filterButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showAdvancedFilters &&
                advancedFiltersRef.current &&
                !advancedFiltersRef.current.contains(event.target) &&
                filterButtonRef.current &&
                !filterButtonRef.current.contains(event.target)) {
                setShowAdvancedFilters(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAdvancedFilters]);

    const toggleAdvancedFilters = () => {
        setShowAdvancedFilters(!showAdvancedFilters);
    };

    const clearAllConditions = () => {
        setFilterConditions([{ field: '', value: '' }]);
        setAdvancedFiltersApplied([]);
        setHasInteracted(true);
    };

    const handleSelectClick = (index) => {
        setOpenSelect(openSelect === index ? null : index);
    };

    const handleCancelFilter = () => {
        setShowAdvancedFilters(false);
        setFilterConditions(advancedFiltersApplied.length > 0 ? advancedFiltersApplied : [
            { field: '', value: '' }
        ]);
    };

    const getAvailableFilterOptions = useMemo(() => {
        try {
            return filterFields.filter(field =>
                ['text', 'number', 'float', 'date', 'select'].includes(field.type)
            );
        } catch (error) {
            console.error('Error loading filter fields:', error);
            return [];
        }
    }, []);

    const getUnusedOptions = useMemo(() => {
        const selectedFields = filterConditions.map(condition => condition.field).filter(Boolean);
        return getAvailableFilterOptions.filter(field => !selectedFields.includes(field.key));
    }, [filterConditions, getAvailableFilterOptions]);

    const renderValueInput = (condition, index) => {
        const field = getAvailableFilterOptions.find(f => f.key === condition.field);
        if (!field) {
            return (
                <input
                    type="text"
                    className="condition-field condition-value"
                    value={condition.value || ''}
                    placeholder="Enter value"
                    onChange={(e) => updateConditionValue(index, e.target.value)}
                />
            );
        }

        switch (field.type) {
            case 'select':
                return (
                    <select
                        className={`condition-field condition-value status-select ${openSelect === `value-${index}` ? 'up-arrow' : ''}`}
                        value={condition.value || ''}
                        onChange={(e) => updateConditionValue(index, e.target.value)}
                        onClick={() => handleSelectClick(`value-${index}`)}
                        onBlur={() => setOpenSelect(null)}
                    >
                        <option value="" className="hidden-option" disabled>Select item</option>
                        {field.options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                );

            case 'date':
                return (
                    <div className="date-range-input">
                        <input
                            type="date"
                            className="condition-value-date"
                            value={condition.startDate || ''}
                            onChange={(e) => updateConditionDate(index, 'startDate', e.target.value)}
                        />
                        <input
                            type="date"
                            className="condition-value-date"
                            value={condition.endDate || ''}
                            onChange={(e) => updateConditionDate(index, 'endDate', e.target.value)}
                        />
                    </div>
                );

            case 'number':
            case 'float':
                return (
                    <input
                        type="number"
                        className="condition-field condition-value"
                        value={condition.value || ''}
                        placeholder="Enter value"
                        onChange={(e) => updateConditionValue(index, e.target.value)}
                    />
                );

            default:
                return (
                    <input
                        type="text"
                        className="condition-field condition-value"
                        value={condition.value || ''}
                        placeholder="Enter value"
                        onChange={(e) => updateConditionValue(index, e.target.value)}
                    />
                );
        }
    };

    const updateConditionValue = (index, value, isDateField = false) => {
        setFilterConditions(prevConditions =>
            prevConditions.map((condition, i) =>
                i === index
                    ? isDateField
                        ? { ...condition, startDate: value, endDate: value }
                        : { ...condition, value }
                    : condition
            )
        );
    };

    const updateConditionDate = (index, dateType, value) => {
        setFilterConditions(prevConditions =>
            prevConditions.map((condition, i) =>
                i === index ? { ...condition, [dateType]: value } : condition
            )
        );
    };

    const applyFilter = useCallback((filters, advancedFilters) => {
        const filteredData = { ...filters };

        if (advancedFilters && advancedFilters.length > 0) {
            filteredData.advancedFilters = advancedFilters;
        }

        // Here send data to backend
        console.log('Sending filter request:', JSON.stringify(filteredData));
    }, []);

    useEffect(() => {
        if (hasInteracted) {
            applyFilter(checkboxFilters, advancedFiltersApplied);
        }
    }, [checkboxFilters, advancedFiltersApplied, applyFilter, hasInteracted]);

    const handleCheckboxChange = (filterName) => {
        return () => {
            setCheckboxFilters(prev => ({
                ...prev,
                [filterName]: !prev[filterName]
            }));
            setHasInteracted(true);
        };
    };

    const handleAdvancedFilterApply = () => {
        const validFilters = filterConditions.filter(condition =>
            condition.field && (condition.value || (condition.startDate && condition.endDate))
        );
        setAdvancedFiltersApplied(validFilters);
        setShowAdvancedFilters(false);
        setHasInteracted(true);
    };

    return (
        <div className="filter-panel">
            <div className="checkbox-container">
                <div className="expired-contracts" onClick={handleCheckboxChange('expiredContracts')}>
                    <div className={`published-icon ${checkboxFilters.expiredContracts ? 'checked' : ''}`}>
                        <CheckMark />
                    </div>
                    <span className="expired-contracts-text">Expired contracts</span>
                </div>
                <div className="will-expire" onClick={handleCheckboxChange('willExpire')}>
                    <div className={`published-icon ${checkboxFilters.willExpire ? 'checked' : ''}`}>
                        <CheckMark />
                    </div>
                    <span className="will-expire-text">Will expire in 1 month</span>
                </div>
                <div className="publication-date" onClick={handleCheckboxChange('publicationDate')}>
                    <div className={`published-icon ${checkboxFilters.publicationDate ? 'checked' : ''}`}>
                        <CheckMark />
                    </div>
                    <span className="publication-date-text">Publication date in 1 month</span>
                </div>
                <div className="published" onClick={handleCheckboxChange('published')}>
                    <div className={`published-icon ${checkboxFilters.published ? 'checked' : ''}`}>
                        <CheckMark />
                    </div>
                    <span className="published-text">Published</span>
                </div>
            </div>
            <div className="filter-button-block">
                <button
                    className="filter-button"
                    onClick={toggleAdvancedFilters}
                    ref={filterButtonRef}
                >
                    <FilterIcon className="button-icon" />
                    Filter
                </button>
                <button className="export-button">
                    <ExportIcon className="button-icon" />
                    Export data
                </button>
            </div>

            {showAdvancedFilters && (
                <div className="advanced-filters" ref={advancedFiltersRef}>
                    <div className="advanced-filters-header">
                        <h3>Advanced filters</h3>
                        <button onClick={clearAllConditions}>Clear all</button>
                    </div>
                    {filterConditions.map((condition, index) => (
                        <div key={index} className="filter-condition">
                            <div className="filter-condition-content">
                                <span className="condition-text">Where</span>
                                <select
                                    className={`condition-field status-select ${openSelect === `field-${index}` ? 'up-arrow' : ''}`}
                                    value={condition.field}
                                    onChange={(e) => {
                                        const newConditions = [...filterConditions];
                                        const newField = e.target.value;
                                        const fieldType = getAvailableFilterOptions.find(f => f.key === newField)?.type;
                                        if (fieldType === 'date') {
                                            newConditions[index] = { field: newField, startDate: '', endDate: '' };
                                        } else {
                                            newConditions[index] = { field: newField, value: '' };
                                        }
                                        setFilterConditions(newConditions);
                                    }}
                                    onClick={() => handleSelectClick(`field-${index}`)}
                                    onBlur={() => setOpenSelect(null)}
                                >
                                    <option value="" className="hidden-option" disabled>Select item</option>
                                    {getUnusedOptions.concat(condition.field ? [getAvailableFilterOptions.find(f => f.key === condition.field)] : [])
                                        .filter((field, index, self) => field && index === self.findIndex(t => t.key === field.key))
                                        .map(field => (
                                            <option key={field.key} value={field.key}>{field.title}</option>
                                        ))
                                    }
                                </select>
                                <span className="condition-text">is</span>
                                {renderValueInput(condition, index)}
                            </div>
                            {index > 0 && (
                                <button
                                    className="clear-condition"
                                    onClick={() => setFilterConditions(
                                        filterConditions.filter((_, conditionIndex) => conditionIndex !== index)
                                    )}
                                >
                                    <ClearCondition />
                                </button>
                            )}
                        </div>
                    ))}
                    {getUnusedOptions.length > 0 && (
                        <button
                            className="add-condition"
                            onClick={() => setFilterConditions(
                                [
                                    ...filterConditions,
                                    { field: '', value: '' }
                                    ]
                            )}
                        >
                            <span className="bold">+</span> <span>Add condition</span>
                        </button>
                    )}
                    <div className="filter-start-block">
                        <button className="cancel-filter-button" onClick={() => setShowAdvancedFilters(false)}>
                            Cancel
                        </button>
                        <button className="start-filter-button" onClick={handleAdvancedFilterApply}>
                            Filter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default FilterPanel;